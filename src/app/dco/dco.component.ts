import { Component, Input, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Observable } from 'rxjs';
import * as _ from "lodash";
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import {AbstractControl, FormControl, FormGroupDirective, FormBuilder, FormGroup, FormArray, NgForm, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { Offers } from '../lib/service/data/offers';

import { Dialog } from "../lib/service/data/dialog";
import { DcoDialogComponent } from '../dco-dialog/dco-dialog.component';

import { forEach } from '../../../node_modules/@angular/router/src/utils/collection';

@Component({
  selector: 'app-dco',
  templateUrl: './dco.component.html',
  styleUrls: ['./dco.component.scss']
})

export class DcoComponent implements OnInit {

  @Input()
  dialogid: Number;
  textvalue: String;
  urlvalue: String;
  category: String;

  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    headers: ['Placement ID','Offer Headline 1','Vehicle Name 1','CTA Label 1','CTA URL 1','Disclosure Label 1','Logo 1','Vehicle Image 1','Offer Headline 2','Vehicle Name 2','CTA Label 2','CTA URL 2','Disclosure Label 2','Logo 2','Vehicle Image 2','Offer Headline 3','Vehicle Name 3','CTA Label 3','CTA URL 3','Disclosure Label 3','Logo 3','Vehicle Image 3','Disclosure Copy 1','Disclosure Copy 2','Disclosure Copy 3','Background Image','Background URL'],
    showTitle: true,
    title: 'Placement IDs',
    useBom: false,
    removeNewLines: true,
    keys: ['placementid','offerheadline1','vehiclename1','ctalabel1','ctaurl1','disclosurelabel1','logo1','vehicleimage1','offerheadline2','vehiclename2','ctalabel2','ctaurl2','disclosurelabel2','logo2','vehicleimage2','offerheadline3','vehiclename3','ctalabel3','ctaurl3','disclosurelabel3','logo3','vehicleimage3','disclosurecopy1','disclosurecopy2','disclosurecopy3','backgroundimage','backgroundurl' ]
  };

  csvData = [];

  dcoForm: FormGroup;
  id:string='';
  userid: string='';
  make: string='';
  model: String='';
  year: String='';
  dealerid: string='';
  dealername: string='';
  dealerurl: string='';
  pacode: string='';
  postalcode: string='';
  offers : [{
    size: String,
    placementid: String,
    offerheadline1: String,
    vehiclename1: String,
    ctalabel1: String,
    ctaurl1: String,
    disclosurelabel1: String,
    logo1: String,
    vehicleimage1: String,
    offerheadline2: String,
    vehiclename2: String,
    ctalabel2: String,
    ctaurl2: String,
    disclosurelabel2: String,
    logo2: String,
    vehicleimage2: String,
    offerheadline3: String,
    vehiclename3: String,
    ctalabel3: String,
    ctaurl3: String,
    disclosurelabel3: String,
    logo3: String,
    vehicleimage3: String,
    disclosurecopy1: String,
    disclosurecopy2: String,
    disclosurecopy3: String,
    backgroundimage: String,
    backgroundurl: String,
  }];

  public valueSearch: string = '';
  public search: string = null;
  dcos: any;
  filteredDcos: any;
  groupedDcos: any;
  groupedDcoIds: any;
  private selectedDco: any;
  private selectedPlacement: any;

  offersData: Offers[] = [{
    size: new String,
    placementid: new String,
    offerheadline1: new String,
    vehiclename1: new String,
    ctalabel1: new String,
    ctaurl1: new String,
    disclosurelabel1: new String,
    logo1: new String,
    vehicleimage1: new String,
    offerheadline2: new String,
    vehiclename2: new String,
    ctalabel2: new String,
    ctaurl2: new String,
    disclosurelabel2: new String,
    logo2: new String,
    vehicleimage2: new String,
    offerheadline3: new String,
    vehiclename3: new String,
    ctalabel3: new String,
    ctaurl3: new String,
    disclosurelabel3: new String,
    logo3: new String,
    vehicleimage3: new String,
    disclosurecopy1: new String,
    disclosurecopy2: new String,
    disclosurecopy3: new String,
    backgroundimage: new String,
    backgroundurl: new String
  }];
  
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns = ['placementid'];
  rows: FormArray = this.fb.array([]);

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
    private fb: FormBuilder,
    private dialog: MatDialog
        
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

        this.offersData = this.groupedDcos[this.groupedDcoIds[0]][0].offers;
      
        this.offersData.forEach((d: Offers) => this.addRow(d, false));

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
        'offers': this.rows
      });
     
    }


    private selectedDcoIndex = 0;
    private panelCollapse = false;

    getDco(allDcos, dcoId, OfferId) {
        console.log("gallDcos", allDcos[dcoId][OfferId]);
        this.id = allDcos[dcoId][OfferId]._id;
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

    addRow(d?: Offers, noUpdate?: boolean) {
      const row = this.fb.group({
        'size'   : [d && d.size ? d.size : null, []],
        'placementid'   : [d && d.placementid ? d.placementid : null, []],
        'offerheadline1'   : [d && d.offerheadline1 ? d.offerheadline1 : null, []],
        'vehiclename1'   : [d && d.vehiclename1 ? d.vehiclename1 : null, []],
        'ctalabel1'   : [d && d.ctalabel1 ? d.ctalabel1 : null, []],
        'ctaurl1'   : [d && d.ctaurl1 ? d.ctaurl1 : null, []],
        'disclosurelabel1'   : [d && d.disclosurelabel1 ? d.disclosurelabel1 : null, []],
        'logo1'   : [d && d.logo1 ? d.logo1 : null, [],],
        'vehicleimage1'   : [d && d.vehicleimage1 ? d.vehicleimage1 : null, []],
        'offerheadline2'   : [d && d.offerheadline2 ? d.offerheadline2 : null, []],
        'vehiclename2'   : [d && d.vehiclename2 ? d.vehiclename2 : null, []],
        'ctalabel2'   : [d && d.ctalabel2 ? d.ctalabel2 : null, []],
        'ctaurl2'   : [d && d.ctaurl2 ? d.ctaurl2 : null, []],
        'disclosurelabel2'   : [d && d.disclosurelabel2 ? d.disclosurelabel2 : null, []],
        'logo2'   : [d && d.logo2 ? d.logo2 : null, []],
        'vehicleimage2'   : [d && d.vehicleimage2 ? d.vehicleimage2 : null, []],
        'offerheadline3'   : [d && d.offerheadline3 ? d.offerheadline3 : null, []],
        'vehiclename3'   : [d && d.vehiclename3 ? d.vehiclename3 : null, []],
        'ctalabel3'   : [d && d.ctalabel3 ? d.ctalabel3 : null, []],
        'ctaurl3'   : [d && d.ctaurl3 ? d.ctaurl3 : null, []],
        'disclosurelabel3'   : [d && d.disclosurelabel3 ? d.disclosurelabel3 : null, []],
        'logo3'   : [d && d.logo3 ? d.logo3 : null, []],
        'vehicleimage3'   : [d && d.vehicleimage3 ? d.vehicleimage3 : null, []],
        'disclosurecopy1'   : [d && d.disclosurecopy1 ? d.disclosurecopy1 : null, []],
        'disclosurecopy2'   : [d && d.disclosurecopy2 ? d.disclosurecopy2 : null, []],
        'disclosurecopy3'   : [d && d.disclosurecopy3 ? d.disclosurecopy3 : null, []],
        'backgroundimage'   : [d && d.backgroundimage ? d.backgroundimage : null, []],
        'backgroundurl'   : [d && d.backgroundurl ? d.backgroundurl : null, []]
      });
      this.rows.push(row);
      if (!noUpdate) { this.updateView(); }
    }

    onFormSubmit(formc:NgForm) {
      
      formc = this.dcoForm.value;
      this.api.updateDco(this.id, formc)
        .subscribe(res => {
            let id = res['_id'];
            this.router.navigate(['dcos']);
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

    updateView() {
      this.dataSource.next(this.rows.controls);
    }

    openDialog(title, label, textvalue, urlvalue, i, isBold) {
   
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '550px'

      dialogConfig.data = {
          title, label, textvalue, urlvalue, isBold
      };

      const dialogRef = this.dialog.open(DcoDialogComponent,
          dialogConfig);


      dialogRef.afterClosed().subscribe(
          val => {
            if (val != undefined) {

              /** Frame1 */
              if(val.label == 'logo1') this.groupedDcos[this.selectedDco][0].offers[i].logo1 = val.textvalue;
              if(val.label == 'offerheadline1') this.groupedDcos[this.selectedDco][0].offers[i].offerheadline1 = val.textvalue;
              if(val.label == 'vehicleimage1') this.groupedDcos[this.selectedDco][0].offers[i].vehicleimage1 = val.textvalue;
              if(val.label == 'vehiclename1') this.groupedDcos[this.selectedDco][0].offers[i].vehiclename1 = val.textvalue;
              if(val.label == 'ctalabel1') {
                this.groupedDcos[this.selectedDco][0].offers[i].ctalabel1 = val.textvalue;
                this.groupedDcos[this.selectedDco][0].offers[i].ctaurl1 = val.urlvalue;
              }
              if(val.label == 'disclosurelabel1') this.groupedDcos[this.selectedDco][0].offers[i].disclosurelabel1 = val.textvalue;
              /** Frame2 */
              if(val.label == 'logo2') this.groupedDcos[this.selectedDco][0].offers[i].logo2 = val.textvalue;
              if(val.label == 'offerheadline2') this.groupedDcos[this.selectedDco][0].offers[i].offerheadline2 = val.textvalue;
              if(val.label == 'vehicleimage2') this.groupedDcos[this.selectedDco][0].offers[i].vehicleimage2 = val.textvalue;
              if(val.label == 'vehiclename2') this.groupedDcos[this.selectedDco][0].offers[i].vehiclename2 = val.textvalue;
              if(val.label == 'ctalabel2') {
                this.groupedDcos[this.selectedDco][0].offers[i].ctalabel2 = val.textvalue;
                this.groupedDcos[this.selectedDco][0].offers[i].ctaurl2 = val.urlvalue;
              }
              if(val.label == 'disclosurelabel2') this.groupedDcos[this.selectedDco][0].offers[i].disclosurelabel2 = val.textvalue;
              /** Frame3 */
              if(val.label == 'logo3') this.groupedDcos[this.selectedDco][0].offers[i].logo3 = val.textvalue;
              if(val.label == 'offerheadline3') this.groupedDcos[this.selectedDco][0].offers[i].offerheadline3 = val.textvalue;
              if(val.label == 'vehicleimage3') this.groupedDcos[this.selectedDco][0].offers[i].vehicleimage3 = val.textvalue;
              if(val.label == 'vehiclename3') this.groupedDcos[this.selectedDco][0].offers[i].vehiclename3 = val.textvalue;
              if(val.label == 'ctalabel3') {
                this.groupedDcos[this.selectedDco][0].offers[i].ctalabel3 = val.textvalue;
                this.groupedDcos[this.selectedDco][0].offers[i].ctaurl3 = val.urlvalue;
              }
              if(val.label == 'disclosurelabel3') this.groupedDcos[this.selectedDco][0].offers[i].disclosurelabel3 = val.textvalue;

              this.getDco(this.groupedDcos, this.selectedDco, 0 );
            }
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

