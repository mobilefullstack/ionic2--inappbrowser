import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WebService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Webservice {
  data: any;
  constructor(public http: Http) {
    console.log('Hello WebService Provider');
  }

  ionViewDidEnter(){
    console.log('WebService Provider DidEnter');
  }

  static get parameters() {
    return [[Http]];
  }

  load(url) {
    this.data = "";
    if (this.data) {
      // already loaded data
      console.log("return data");
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, err =>{
          this.data = err;
          resolve(this.data);
        });
    });
  }
}
