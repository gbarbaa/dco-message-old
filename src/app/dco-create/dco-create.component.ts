import {Component, Input, OnInit, Inject, ViewEncapsulation, TemplateRef,ElementRef } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from "@angular/material";
import {tap, catchError} from 'rxjs/operators';
import {ApiService} from '../api.service';

import * as _ from 'lodash';
import {of} from 'rxjs/observable/of';
import {AbstractControl, FormControl, FormGroupDirective, FormBuilder, FormGroup, FormArray, NgForm, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Offers } from '../lib/service/data/offers';


import { Dialog } from "../lib/service/data/dialog";
import { DcoDialogComponent } from '../dco-dialog/dco-dialog.component';


export interface Vehiclemodel {
  value: string;
  viewValue: string;
}

export interface Vehiclemake {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dco-create',
  templateUrl: './dco-create.component.html',
  styleUrls: [
    './dco-create.component.scss'

  ]
})

export class DcoCreateComponent implements OnInit {

  @Input()
  dialogid: Number;
  textvalue: String;
  urlvalue: String;
  category: String;

  dcoForm: FormGroup;
  id:string='';
  userid: String = '';
  make: String = '';
  model: String = '';
  year: String = '';
  dealerid: String = '';
  dealername: String = '';
  dealerurl: String = '';
  pacode: String = '';
  postalcode: String = '';
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

  modalRef: BsModalRef;
  submittedData: Object ;
  frameForm: FormGroup;

  selected = -1;

  // Default content when check any offer

  defaultHeading : String = '';
  defaultSubHeading : String = '';
  defaultDisclouser : String = 'Disclosure';

  unCheckedCheckbox : Boolean = false;

  vehiclemakes: Vehiclemake[] = [
    {value: 'Ford', viewValue: 'Ford'}
  ];

  vehiclemodels: Vehiclemodel[] = [
    {value: 'Fusion', viewValue: 'Fusion'},
    {value: 'Fiesta', viewValue: 'Fiesta'},
    {value: 'Focus', viewValue: 'Focus'},
    {value: 'Mustang', viewValue: 'Mustang'},
    {value: 'Taurus', viewValue: 'Taurus'},
    {value: 'Escape', viewValue: 'Escape'},
    {value: 'EcoSport', viewValue: 'EcoSport'},
    {value: 'Edge', viewValue: 'Edge'},
    {value: 'Flex', viewValue: 'Flex'},
    {value: 'Explorer', viewValue: 'Explorer'},
    {value: 'Expedition', viewValue: 'Expedition'},
    {value: 'F-150', viewValue: 'F-150'},
    {value: 'SuperDuty', viewValue: 'SUPER DUTY'},
    {value: 'Transit', viewValue: 'Transit'},
    {value: 'TransitConnect', viewValue: 'Transit Connect'},
    {value: 'FocusElectric', viewValue: 'Focus Electric'},
    {value: 'FusionHybrid', viewValue: 'Fusion Hybrid'},
    {value: 'Fusion Energi', viewValue: 'Fusion Energi'},
    {value: 'C-MAX Hybrid', viewValue: 'C-MAX Hybrid'}
  ];

  possible_sizes: any = ['300x600','300x250','790x90','160x600','320x50'];
  possible_frames: any = ["_1", "_2", "_3"];

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
  
  slideConfig = {"slidesToShow": 3, "slidesToScroll": 3, dots: true,arrows : false};

  offer = [];
  openId :String = '';
  conditionDiv :String = '';
  title :String = '';
  repeatBackground : Boolean = false;

  stored_userid = sessionStorage.getItem('userid');
  stored_dealerid = sessionStorage.getItem('dealerid');
  stored_dealername = sessionStorage.getItem('dealername');
  stored_dealerurl = sessionStorage.getItem('dealerurl');
  stored_pacode = sessionStorage.getItem('pacode');
  stored_zipcode = sessionStorage.getItem('zipcode');

  constructor(private http: HttpClient, private router: Router, private activeRoute: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder, private fb: FormBuilder, private bsmodalservice: BsModalService,
    private dialog: MatDialog) {
  }


  ngOnInit() {

    console.log('zipcode', this.stored_zipcode);
    console.log('pacode', this.stored_pacode);

 
    this.dcoForm = this.formBuilder.group({
      'userid': [this.stored_userid],
      'make': [null, Validators.required],
      'model': [null, Validators.required],
      'year': [null, Validators.required],
      'dealerid': [this.stored_dealerid],
      'dealername': [this.stored_dealername],
      'dealerurl': [this.stored_dealerurl],
      'pacode': [this.stored_pacode],
      'postalcode': [this.stored_zipcode, Validators.required],
      'offers':  this.rows
    });
     
     
    //* Create 5 placements ids, 1 for each size, for the intial form 
    this.possible_sizes.forEach(element => {
      this.offersData.forEach((d: Offers) => this.addRow(d, false));
    });


  }

  onFormSubmit(formc: NgForm) {
    //* Cycle through placementids and remove empty ones before post */
    this.editInitialFieldValues();
    this.removeEmptyPlacementIds();

    formc = this.dcoForm.value;
    this.api.postDco(formc)
      .subscribe(res => {
        console.log("resu", res);
          let id = res['_id'];
          this.router.navigate(['dcos']);
        }, (err) => {
          console.log(err);
      });
  }

  addRow(d?: Offers, noUpdate?: boolean) {
    const row = this.fb.group({
      'size': [d && d.size ? d.size : null, []],
      'placementid'   : [d && d.placementid ? d.placementid : null, []],
      'offerheadline1'   : [d && d.offerheadline1 ? d.offerheadline1 : null, []],
      'vehiclename1'   : [d && d.vehiclename1 ? d.vehiclename1 : null, []],
      'ctalabel1'   : [d && d.ctalabel1 ? d.ctalabel1 : null, []],
      'ctaurl1'   : [d && d.ctaurl1 ? d.ctaurl1 : null, []],
      'disclosurelabel1'   : [d && d.disclosurelabel1 ? d.disclosurelabel1 : null, []],
      'logo1'   : [d && d.logo1 ? d.logo1 : null, []],
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
      'disclosurecopy1': [d && d.disclosurecopy1 ? d.disclosurecopy1 : null, []],
      'disclosurecopy2': [d && d.disclosurecopy2 ? d.disclosurecopy2 : null, []],
      'disclosurecopy3': [d && d.disclosurecopy3 ? d.disclosurecopy3 : null, []],
      'backgroundimage': [d && d.backgroundimage ? d.backgroundimage : null, []],
      'backgroundurl'  : [d && d.backgroundurl ? d.backgroundurl : null, []]
    });
    this.rows.push(row);
    if (!noUpdate) { this.updateView(); }
  }

  updateView() {
    this.dataSource.next(this.rows.controls);
  }


  removeEmptyPlacementIds() {
    this.offersData = this.dcoForm.controls['offers'].value;
    this.offersData = _.filter(this.offersData, discs=>discs.placementid != null);
    this.offersData = _.filter(this.offersData, discs=>discs.placementid.length > 0);
    while (this.rows.length !== 0) {
      this.rows.removeAt(0);
    }
    this.offersData.forEach((d: Offers) => this.addRow(d, false));
    this.dcoForm.updateValueAndValidity;
  }

  editInitialFieldValues() {
    this.offersData = this.dcoForm.controls['offers'].value;
    var captured_model = this.dcoForm.controls['model'].value;
    const url_head: string = "https://creativesham.file.core.windows.net/progad/";
    const dealer_folder: string =  this.stored_zipcode + "_" + this.stored_dealerurl + "/";
    const global_folder: string  =  "universal/";
    const azure_token: string = "?sv=2017-11-09&ss=f&srt=sco&sp=rl&se=2022-01-02T03:35:55Z&st=2018-10-12T18:35:55Z&spr=https&sig=9xuB6sBTVQvjHdG3S5W8KyfvrFYw6CjSmcKvhE25Snk%3D"

 //   console.log("offerdata", this.offersData);

    this.possible_sizes.forEach((size, index) => {
        this.offersData[index].size = size;
        /**Logo */
        this.offersData[index].logo1 = url_head + dealer_folder + this.stored_zipcode + "_" + this.stored_dealerurl + size + ".jpg" + azure_token;
        this.offersData[index].logo2 = url_head + dealer_folder + this.stored_zipcode + "_" + this.stored_dealerurl + size + ".jpg" + azure_token;
        this.offersData[index].logo3 = url_head + dealer_folder + this.stored_zipcode + "_" + this.stored_dealerurl + size + ".jpg" + azure_token;
        /**Vehicle Image */
        this.offersData[index].vehicleimage1 = url_head + global_folder + captured_model + "_1_" + size + ".png" + azure_token;
        this.offersData[index].vehicleimage2 = url_head + global_folder + captured_model + "_2_" + size + ".png" + azure_token;
        this.offersData[index].vehicleimage3 = url_head + global_folder + captured_model + "_3_" + size + ".png" + azure_token;
        /**Background URL */
        this.offersData[index].backgroundurl = 	"https://www." + this.stored_dealerurl + ".com/new-inventory/index.htm?search=&model=" + captured_model;
    });
  }

  openDialog(title, label, textvalue, urlvalue, i) {
   
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px'

    dialogConfig.data = {
        title, label, textvalue, urlvalue
    };

    const dialogRef = this.dialog.open(DcoDialogComponent,
        dialogConfig);


    dialogRef.afterClosed().subscribe(
        val => {
          if (val != undefined) {

            /** Frame1 
            if(val.label == 'logo1') this.groupedDcos[this.selectedDco][0].offers[i].logo1 = val.textvalue;
            if(val.label == 'offerheadline1') this.groupedDcos[this.selectedDco][0].offers[i].offerheadline1 = val.textvalue;
            if(val.label == 'vehicleimage1') this.groupedDcos[this.selectedDco][0].offers[i].vehicleimage1 = val.textvalue;
            if(val.label == 'vehiclename1') this.groupedDcos[this.selectedDco][0].offers[i].vehiclename1 = val.textvalue;
            if(val.label == 'ctalabel1') {
              this.groupedDcos[this.selectedDco][0].offers[i].ctalabel1 = val.textvalue;
              this.groupedDcos[this.selectedDco][0].offers[i].ctaurl1 = val.urlvalue;
            }
            if(val.label == 'disclosurelabel1') this.groupedDcos[this.selectedDco][0].offers[i].disclosurelabel1 = val.textvalue;
            /** Frame2
            if(val.label == 'logo2') this.groupedDcos[this.selectedDco][0].offers[i].logo2 = val.textvalue;
            if(val.label == 'offerheadline2') this.groupedDcos[this.selectedDco][0].offers[i].offerheadline2 = val.textvalue;
            if(val.label == 'vehicleimage2') this.groupedDcos[this.selectedDco][0].offers[i].vehicleimage2 = val.textvalue;
            if(val.label == 'vehiclename2') this.groupedDcos[this.selectedDco][0].offers[i].vehiclename2 = val.textvalue;
            if(val.label == 'ctalabel2') {
              this.groupedDcos[this.selectedDco][0].offers[i].ctalabel2 = val.textvalue;
              this.groupedDcos[this.selectedDco][0].offers[i].ctaurl2 = val.urlvalue;
            }
            if(val.label == 'disclosurelabel2') this.groupedDcos[this.selectedDco][0].offers[i].disclosurelabel2 = val.textvalue;
            /** Frame3
            if(val.label == 'logo3') this.groupedDcos[this.selectedDco][0].offers[i].logo3 = val.textvalue;
            if(val.label == 'offerheadline3') this.groupedDcos[this.selectedDco][0].offers[i].offerheadline3 = val.textvalue;
            if(val.label == 'vehicleimage3') this.groupedDcos[this.selectedDco][0].offers[i].vehicleimage3 = val.textvalue;
            if(val.label == 'vehiclename3') this.groupedDcos[this.selectedDco][0].offers[i].vehiclename3 = val.textvalue;
            if(val.label == 'ctalabel3') {
              this.groupedDcos[this.selectedDco][0].offers[i].ctalabel3 = val.textvalue;
              this.groupedDcos[this.selectedDco][0].offers[i].ctaurl3 = val.urlvalue;
            }
            if(val.label == 'disclosurelabel3') this.groupedDcos[this.selectedDco][0].offers[i].disclosurelabel3 = val.textvalue;

            this.getDco(this.groupedDcos, this.selectedDco, 0 ); */
          }
        }, (err) => {
          console.log(err);
        }
    );
}


  offerInfo(template: TemplateRef<any>,record) {
    this.offer = [];
    this.selected = -1;
    this.api.getOffer(record)
      .subscribe(data => {
        if(record.model == 'Fusion' || record.model == 'Focus') {
          this.offer = data.Response.Nameplate.Trims.Trim[0].Groups.Group;
        } else {
          if(data.Response.Nameplate.Trims != '') {
            this.offer = data.Response.Nameplate.Trims.Trim.Groups.Group;
          } else {
            this.offer = data.Response.Nameplate.Groups.Group;
          }
        }
      } ,  error => {

      });

    this.submittedData = record;
    this.modalRef = this.bsmodalservice.show(template, { class: 'modal-lg' });
  }


  clickOffer(record) {

    let data = this.offer[record];
    console.log("modalData", data);
    this.offersData = this.dcoForm.controls['offers'].value;

    this.possible_sizes.forEach((size, index) => {
        this.offersData[index].offerheadline1 = data.Campaign.CampaignType;
        this.offersData[index].offerheadline2 = data.Campaign.CampaignType;
        this.offersData[index].offerheadline3 = data.Campaign.CampaignType;
        /**Vehicle Name */
        this.offersData[index].vehiclename1 =  data.Campaign.Name.replace(/<[^>]*>/g, '');;
        this.offersData[index].vehiclename2 =  data.Campaign.Name.replace(/<[^>]*>/g, '');;
        this.offersData[index].vehiclename3 =  data.Campaign.Name.replace(/<[^>]*>/g, '');;
        /**Cta label */
        this.offersData[index].ctalabel1 =  'SHOP NOW';
        this.offersData[index].ctalabel2 =  'SHOP NOW';
        this.offersData[index].ctalabel3 =  'SHOP NOW';
        /**Cta url */
        // this.offersData[index].ctaurl1 =  data.Campaign.CampaignImages.CampaignImage.URL;
        // this.offersData[index].ctaurl2 =  data.Campaign.CampaignImages.CampaignImage.URL;
        // this.offersData[index].ctaurl3 =  data.Campaign.CampaignImages.CampaignImage.URL;
        /**Disclaim */
        this.offersData[index].disclosurecopy1 =  data.Campaign.Disclaimer;
        this.offersData[index].disclosurecopy2 =  data.Campaign.Disclaimer;
        this.offersData[index].disclosurecopy3 =  data.Campaign.Disclaimer;
        /**Disclaim */
        this.offersData[index].disclosurelabel1 =  'Offer Disclosure';
        this.offersData[index].disclosurelabel2 =  'Offer Disclosure';
        this.offersData[index].disclosurelabel3 =  'Offer Disclosure';
    });
    this.offersData = this.dcoForm.controls['offers'].value;
    while (this.rows.length !== 0) {
      this.rows.removeAt(0);
    }
    this.offersData.forEach((d: Offers) => this.addRow(d, false));

    this.dcoForm.updateValueAndValidity;
    console.log("dcoForm", this.dcoForm);
  }

  onChangeResetFrame() {
   
  }


}
