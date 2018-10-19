import {Component, OnInit,TemplateRef} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {tap, catchError} from 'rxjs/operators';
import {ApiService} from '../api.service';
import * as _ from 'lodash';
import {of} from 'rxjs/observable/of';
import {AbstractControl, FormControl, FormGroupDirective, FormBuilder, FormGroup, FormArray, NgForm, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


import { Offers } from '../lib/service/data/offers';

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
  dcoForm: FormGroup;
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
    placementid: String;
    offerheadline1: String;
    vehiclename1: String;
    ctalabel1: String;
    ctaurl1: String;
    disclosurelabel1: String;
    logo1: String;
    vehicleimage1: String;
  }];
  publisher: String = '';

  modalRef: BsModalRef;
  submittedData : Object ;

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
    {value: 'FusionEnergi', viewValue: 'Fusion Energi'},
    {value: 'C-MAX Hybrid', viewValue: 'C-MAX Hybrid'}
  ];

  offersData: Offers[] = [ 
    {placementid: new String,
    offerheadline1: new String,
    vehiclename1: new String,
    ctalabel1: new String,
    ctaurl1: new String,
    disclosurelabel1: new String,
    logo1: new String,
    vehicleimage1: new String}
  ];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns = ['placementid'];
  rows: FormArray = this.fb.array([]);
  
  slideConfig = {"slidesToShow": 3, "slidesToScroll": 3, dots: true,arrows : false};

  offer = [];


  constructor(private http: HttpClient, private router: Router, private api: ApiService, private formBuilder: FormBuilder, private fb: FormBuilder, private bsmodalservice: BsModalService) {
  }

  ngOnInit() {

    //retrieving values from the session and create values base on naming convention//
    var stored_userid = sessionStorage.getItem('userid');
    var stored_dealerid = sessionStorage.getItem('dealerid');
    var stored_dealername = sessionStorage.getItem('dealername');
    var stored_dealerurl = sessionStorage.getItem('dealerurl');
    var stored_pacode = sessionStorage.getItem('pacode');
    var stored_zipcode = sessionStorage.getItem('zipcode');
    console.log('userid', stored_userid);
    this.editInitialFieldValues();
 
    this.dcoForm = this.formBuilder.group({
      'userid': [stored_userid],
      'make': [null, Validators.required],
      'model': [null, Validators.required],
      'year': [null, Validators.required],
      'dealerid': [stored_dealerid],
      'dealername': [stored_dealername],
      'dealerurl': [stored_dealerurl],
      'pacode': [stored_pacode],
      'postalcode': [stored_zipcode, Validators.required],
      'offers':  this.rows
    
    }, err => {
      if(err.status === 401) {
        this.router.navigate(['login']);
      }
    });
     
    //* Create 5 empty placements ids, 1 for each size, for the intial form 
     this.offersData.forEach((d: Offers) => this.addRow(d, false));
     this.offersData.forEach((d: Offers) => this.addRow(d, false));
     this.offersData.forEach((d: Offers) => this.addRow(d, false));
     this.offersData.forEach((d: Offers) => this.addRow(d, false));
     this.offersData.forEach((d: Offers) => this.addRow(d, false));

    //this.offerInfo();

  }

  onFormSubmit(formc: NgForm) {
    //* Cycle through 5 placementids and remove empty ones before post */
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
      'placementid'   : [d && d.placementid ? d.placementid : null, []],
      'offerheadline1'   : [d && d.offerheadline1 ? d.offerheadline1 : null, []],
      'vehiclename1'   : [d && d.vehiclename1 ? d.vehiclename1 : null, []],
      'ctalabel1'   : [d && d.ctalabel1 ? d.ctalabel1 : null, []],
      'ctaurl1'   : [d && d.ctaurl1 ? d.ctaurl1 : null, []],
      'disclosurelabel1'   : [d && d.disclosurelabel1 ? d.disclosurelabel1 : null, []],
      'logo1'   : [d && d.logo1 ? d.logo1 : null, []],
      'vehicleimage1'   : [d && d.vehicleimage1 ? d.vehicleimage1 : null, []]
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
    
  }
  offerInfo(template: TemplateRef<any>,record) {
    this.api.getOffer(record)
        .subscribe(data => { 
          
          console.log(data) 
          

          if(data.Response.Nameplate.Trims != '') {
            this.offer = data.Response.Nameplate.Trims.Trim.Groups.Group;   
          } else {
            this.offer = data.Response.Nameplate.Groups.Group;   
          }
      });

    this.submittedData = record;
    
    // if(!record.make && !record.model && !record.year && !record.zipcode) {
      this.modalRef = this.bsmodalservice.show(template);  
    // }
      
    
  }

  open(template: TemplateRef<any>) {
    console.log(template);
    
  } 

  onChange(event, index, item) {

    
    item.checked = !item.checked;

    // this.lastAction = 'index: ' + index + ', label: ' + item.label + ', checked: ' + item.checked;

    console.log(index)
    console.log(event)
    console.log(item);

}



}
