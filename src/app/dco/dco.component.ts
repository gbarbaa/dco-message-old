import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { Observable } from 'rxjs';
import * as _ from "lodash";
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { FormControl, FormGroupDirective, FormBuilder, FormGroup, FormArray, NgForm, Validators } from '@angular/forms';

import { Dco } from '../lib/service/data/dco';

@Component({
  selector: 'app-dco',
  templateUrl: './dco.component.html',
  styleUrls: ['./dco.component.scss']
})

export class DcoComponent implements OnInit {

  dcoForm: FormGroup;
  id:string='';
  make: string='';
  model: String='';
  year: String='';
  placementid: string='';
  zipcode: string='';
  dealerid: string='';
  dealerName: string='';
  dealerurl: string='';

  public valueSearch: string = '';
  public search: string = null;
  dcos: any;
 
  private selectedDco: Dco;

constructor(
    private api: ApiService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private fb: FormBuilder
        
    ){
      this.activeRoute.queryParams.subscribe(params => {
        this.search = _.lowerCase(params["search"]);

          if(this.search != undefined){
            this.valueSearch = this.search;
        }
      });
    }

    ngOnInit() {

      this.api.getDcos()

        .subscribe(res => {

        this.dcos = res;
        
        console.log("ress", this.dcos);
     
        }, err => {
          console.log(err);
          if(err.status === 401) {
            this.router.navigate(['login']);
          }
      });

      this.dcoForm = this.formBuilder.group({
        'make' : [null, Validators.required],
        'model' : [null, Validators.required],
        'year' : [null, Validators.required],
        'zipcode' : [null, Validators.required],
        'placementid' : [null, Validators.required],
        'dealerid' : [null],
        'dealername' : [null],
        'dealerurl' : [null],

      });
    }

    private selectedDcoIndex = 0;

    getDco(allDcos, dcoId) {

        this.id = allDcos[dcoId]._id;
        this.dcoForm.setValue({
          make: allDcos[dcoId].make,
          model: allDcos[dcoId].model,
          year: allDcos[dcoId].year,
          zipcode: allDcos[dcoId].postalcode,
          placementid: allDcos[dcoId].placementid,
          dealerid: allDcos[dcoId].dealerid,
          dealername: allDcos[dcoId].dealername,
          dealerurl: allDcos[dcoId].dealerurl
       });
    };

     selectDco(key, i){

      this.selectedDco = key;
 
    };


    logout() {
      localStorage.removeItem('jwtToken');
      this.router.navigate(['login']);
    };

 

    onFormSubmit(form:NgForm) {
      this.api.updateDco(this.id, form)
        .subscribe(res => {
            let id = res['_id'];
            this.router.navigate(['/dco-details', id]);
          }, (err) => {
            console.log(err);
          }
        );
    };
  
    deleteDco() {
      this.api.deleteDco(this.id)
        .subscribe(res => {
          this.router.navigate(['/dco-details', this.id]);
          }, (err) => {
            console.log(err);
          }
        );
    }
}

export class DcoDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getDcos();
  }

  disconnect() {

  }
}

