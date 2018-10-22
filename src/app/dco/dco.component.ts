import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import * as _ from "lodash";
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import {AbstractControl, FormControl, FormGroupDirective, FormBuilder, FormGroup, FormArray, NgForm, Validators, NgControlStatus } from '@angular/forms';

import { Offers } from '../lib/service/data/offers';

import { Dco } from '../lib/service/data/dco';

import { forEach } from '../../../node_modules/@angular/router/src/utils/collection';

@Component({
  selector: 'app-dco',
  templateUrl: './dco.component.html',
  styleUrls: ['./dco.component.scss']
})

export class DcoComponent implements OnInit {

  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    headers: ['Placement ID','Offer Headline 1','Vehicle Name 1','CTA Label 1','CTA URL 1','Disclosure Label 1','Logo 1','Vehicle Image 1','Offer Headline 2','Vehicle Name 2','CTA Label 2','CTA URL 2','Disclosure Label 2','Logo 2','Vehicle Image 2','Offer Headline 3','Vehicle Name 3','CTA Label 3','CTA URL 3','Disclosure Label 3','Logo 3','Vehicle Image 3','Disclosure Copy 1','Disclosure Copy 2','Disclosure Copy 3','Background Image 1','Background Image 2','Background URL'],
    showTitle: true,
    title: 'Placement IDs',
    useBom: false,
    removeNewLines: true,
    keys: ['placementid','offerheadline1','vehiclename1','ctalabel1','ctaurl1','disclosurelabel1','logo1','vehicleimage1','offerheadline2','VehicleName2','ctalabel2','ctaurl2','disclousurelabel2','logo2','vehicleimage2','offerheadline3','VehicleName3','ctalabel3','ctaurl3','disclouserelabel3','logo3','vehicleimage3','disclosurecopy1','disclosurecopy2','disclosurecopy3','backgroundimage','backgroundurl' ]
  };

  csvData = [];

  dcoForm: FormGroup;
  id:string='';
  userid: string='';
  make: string='';
  model: String='';
  year: String='';
  dealerid: string='';
  dealerName: string='';
  dealerurl: string='';
  pacode: string='';
  postalcode: string='';
  offers : [{
    placementid: String
  }];
  

  public valueSearch: string = '';
  public search: string = null;
  dcos: any;
  filteredDcos: any;
  groupedDcos: any;
  groupedDcoIds: any;
  private selectedDco: Dco;
  private selectedPlacement: any;


  stored_userid = sessionStorage.getItem('userid');
  stored_dealerid = sessionStorage.getItem('dealerid');
  stored_dealername = sessionStorage.getItem('dealername');
  stored_dealerurl = sessionStorage.getItem('dealerurl');
  stored_pacode = sessionStorage.getItem('pacode');
  stored_zipcode = sessionStorage.getItem('zipcode');

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
      var stored_userid = sessionStorage.getItem('userid');

      this.api.getDcos()

        .subscribe(res => {

        this.dcos = res;
        
        console.log("ress", this.dcos);
        console.log("user",  stored_userid);

     
        this.filteredDcos = _.filter(this.dcos, user=>user.userid == stored_userid);

        this.groupedDcos = _.groupBy(this.filteredDcos, function(value){
          return value.make + value.model + value.year + value.postalcode;
        });

        this.groupedDcoIds = Object.keys(this.groupedDcos);

        this.selectedDco =  this.groupedDcoIds[0];

        console.log("dcos",  this.groupedDcos);
        console.log("gdcois",  this.groupedDcoIds);


        this.getDco(this.groupedDcos, this.groupedDcoIds[0], 0);

        console.log("make",this.groupedDcos[this.groupedDcoIds[0]][0].make)

        this.selectedPlacement =  this.groupedDcos[this.groupedDcoIds[0]][0].offers[0].placementid;

        this.saveDataforCSV();

        }, err => {
          console.log(err);
          if(err.status === 401) {
            this.router.navigate(['login']);
          }
      });

      this.dcoForm = this.formBuilder.group({
        'userid': [null],
        'make': [null, Validators.required],
        'model': [null, Validators.required],
        'year': [null, Validators.required],
        'dealerid': [null],
        'dealername': [null],
        'dealerurl': [null],
        'pacode': [null],
        'postalcode': [null, Validators.required],
        'offers': [null, Validators.required],
      }, err => {
        if(err.status === 401) {
          this.router.navigate(['login']);
        }
      });
 
    }

    private selectedDcoIndex = 0;
    private panelCollapse = false;

    getDco(allDcos, dcoId, OfferId) {
        console.log("allDcos", allDcos[dcoId][OfferId]);
        this.id = allDcos[dcoId][OfferId].placementid;
        this.dcoForm.setValue({
             userid: allDcos[dcoId][OfferId].userid,
             make: allDcos[dcoId][OfferId].make,
             model: allDcos[dcoId][OfferId].model,
             year: allDcos[dcoId][OfferId].year,
             dealerid: allDcos[dcoId][OfferId].dealerid,
             dealername: allDcos[dcoId][OfferId].dealername,
             dealerurl: allDcos[dcoId][OfferId].dealerurl,
             pacode: allDcos[dcoId][OfferId].pacode,
             postalcode: allDcos[dcoId][OfferId].postalcode,
             offers: allDcos[dcoId][OfferId].offers
        });
    };

    selectDco(key, i){
      console.log("key", key);
      this.selectedDco = key;
      this.selectedDcoIndex = i;
      this.selectedPlacement =  this.groupedDcos[this.groupedDcoIds[i]][0].offers[0].placementid;
      this.getDco(this.groupedDcos, key, 0 );
    };

    selectPlacement(p, i){

      this.selectedPlacement = i;
      console.log("grpdco",this.groupedDcos );
      console.log("seldco",this.selectedDco );
      console.log("selpid",this.selectedPlacement );
      this.getDco(this.groupedDcos, this.selectedDco, p );
    };

    toggleCollapse(){
      this.panelCollapse = !this.panelCollapse;
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

    saveDataforCSV() {
      this.csvData = [];
      this.groupedDcoIds.forEach(dcoIds => {
        console.log("dcoIds", dcoIds);
        this.groupedDcos[dcoIds].forEach(element => {
          element.offers.forEach(placement => {
            this.csvData.push(placement);
            console.log("alldata", this.csvData)
          });
        });
      });  
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

