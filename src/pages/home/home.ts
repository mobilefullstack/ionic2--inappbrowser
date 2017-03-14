import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Webservice } from '../../providers/webservice';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Webservice]
})
export class HomePage {
  selecteduser: any;
  users: any;
  constructor(public navCtrl: NavController, private webService: Webservice,private storage: Storage) {
    
    
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter");
    this.storage.ready().then(() => {
      this.storage.get('url').then((val) => {
        console.log("ionic2_inappbrowser url = "+ val);
        if(val == null){
          this.callJson();
        }
        else{
          this.goToUrl(val);
        }
      });
      
    });
  }

  callJson(){
    this.webService.load("https://timecapturepro.com/conf/servers.json")
    .then(data => {
      console.log("ionic2_inappbrowser = "+ JSON.stringify(data));
      this.users = data['servers'];
      this.selecteduser = this.users[0]['name'];
    })
  }
  
  submit(){
    this.storage.ready().then(() => {
      console.log("ionic2_inappbrowser name = " + this.selecteduser + " url = " + this.users[this.selecteduser] + " selecteduser =  " + this.selecteduser);
      this.storage.set('name', this.selecteduser);
      for(var i = 0 ; i < this.users.length; i ++ ){
        console.log("ionic2_inappbrowser name1 = " + this.users[i]['name'] + " url1 = " + this.users[i]['url']);
        if(this.users[i]['name'] == this.selecteduser){
          this.storage.set('url', this.users[i]['url']);
          break;
        }
      }
      this.goToUrl(this.users[i]['url']);
    });
  }

  goToUrl(url){
    console.log("ionic2_inappbrowser url2 = " + url);
    let browser = new InAppBrowser(url, '_blank', 'toolbar=no, location=no, clearcache=no, status=no');
  }
}
