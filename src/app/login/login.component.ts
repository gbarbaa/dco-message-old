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
   
      this.getDealer(this.data.user['dealers'][0].dealername);
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

      this.data.user['dealers'][0].dealerid = obj['Response']['@attributes']['ttl'];
      this.data.user['dealers'][0].dealercupid = obj['Response']['Dealer']['Cupid'];
      this.data.user['dealers'][0].dealerpacode = obj['Response']['Dealer']['PACode'];
      this.data.user['dealers'][0].dealerzipcode = obj['Response']['Dealer']['Address']['PostalCode'];

      this.http.put('/api/profile',this.data.user).subscribe(resp => {
        console.log("resp", resp);
      }, err => {
        this.message = err.error.msg;
      });
    });
  }

}
