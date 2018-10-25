import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Router } from "@angular/router";
import {  ApiService } from "../api.service";

import { NgxXml2jsonService } from 'ngx-xml2json';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  dealer:any = [];
  dealerid: String;
  dealername: String;
  dealermake: String;
  dealerurl: String;
  dealercupid: String;
  dealerpacode: String;
  dealerzipcode: String;


  constructor(private http: HttpClient, private rest: ApiService, private router: Router, private ngxXml2jsonService: NgxXml2jsonService) { }


  loginData = { username:'', password:''};
  message = '';
  data: any;

  ngOnInit() {

  }

  login() {
    this.http.post('/api/signin',this.loginData).subscribe(resp => {
      this.data = resp;
      localStorage.setItem('jwtToken', this.data.token);
      sessionStorage.setItem('userid', this.data.user.username);

      this.getDealer("Gus Machado Ford");
      this.router.navigate(['dcos']);
      
    }, err => {
      this.message = err.error.msg;
    });
  }

  
  getDealer(dealerName) {
   
      this.rest.getDealer(dealerName).subscribe((data: XMLDocument) => {

      this.dealer = data;

      const parser = new DOMParser();
      const xml = parser.parseFromString(this.dealer, 'text/xml');
      const obj = this.ngxXml2jsonService.xmlToJson(xml);

      console.log("obj", obj['Response']['Dealer']);

     if (obj['Response']['Dealer'].length >= 1) {
       this.data.user['dealers'][0].dealername = dealerName;
       this.data.user['dealers'][0].dealermake = 'Ford';
       this.data.user['dealers'][0].dealerid = obj['Response']['Dealer'][0]['SalesCode'];
       this.data.user['dealers'][0].dealercupid = obj['Response']['Dealer'][0]['Cupid'];
       this.data.user['dealers'][0].dealerurl = obj['Response']['Dealer'][0]['URL'];
       this.data.user['dealers'][0].dealerpacode = obj['Response']['Dealer'][0]['PACode'];
       this.data.user['dealers'][0].dealerzipcode = obj['Response']['Dealer'][0]['Address']['PostalCode'];
     } else {
       this.data.user['dealers'][0].dealername = dealerName;
       this.data.user['dealers'][0].dealermake = 'Ford';
       this.data.user['dealers'][0].dealerid = obj['Response']['Dealer']['SalesCode'];
       this.data.user['dealers'][0].dealercupid = obj['Response']['Dealer']['Cupid'];
       this.data.user['dealers'][0].dealerurl = obj['Response']['Dealer']['URL'];
       this.data.user['dealers'][0].dealerpacode = obj['Response']['Dealer']['PACode'];
       this.data.user['dealers'][0].dealerzipcode = obj['Response']['Dealer']['Address']['PostalCode'];
     }

      this.data.user['dealers'][0].dealerurl = 'gusmachadofordofhialeah';

      this.http.put('/api/profile',this.data.user).subscribe(resp => {
        console.log("resp", resp);
      }, err => {
        this.message = err.error.msg;
      });

      sessionStorage.setItem('dealerid', this.data.user['dealers'][0].dealerid);
      sessionStorage.setItem('dealername', this.data.user['dealers'][0].dealername);
      sessionStorage.setItem('dealerurl', this.data.user['dealers'][0].dealerurl);
      sessionStorage.setItem('pacode', this.data.user['dealers'][0].dealerpacode);
      sessionStorage.setItem('zipcode', this.data.user['dealers'][0].dealerzipcode);
    });
  }

}
