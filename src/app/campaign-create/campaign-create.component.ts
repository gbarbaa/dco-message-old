import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';
import * as _ from "lodash";
import { of } from 'rxjs/observable/of';
import {AbstractControl,  FormControl, FormGroupDirective, FormBuilder, FormGroup, FormArray, NgForm, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { Disclaimers } from '../lib/service/data/disclaimers.model';

@Component({
  selector: 'app-campaign-create',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.scss']
})
export class CampaignCreateComponent implements OnInit {
  campaignForm: FormGroup;
  dealerid: String='';
  dealerName: String='';
  campaignid:string='';
  campaignname:string='';
  adid:string='';
  adname:string='';
  creativeid:string='';
  campaignadtype:string='';
  campaignexpdate:string='';
  adexpdate:string='';
  publisher:string='';
  creativeobject: Object='';
  vehicleid: String='';
  vehiclevin: String='';
  make: String='';
  model: String='';
  year: String='';
  color: String='';
  trim: String='';
  vehicleodometer: String='';
  vehicletitle: String='';
  vehicleprice: String='';
  pacode: String='';
  postalCode: String='';
  disclaimers : [{
    disclaimer: String;
  }];

  data: Disclaimers[] = [ { disclaimer: new String } ];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns = ['disclaimer'];
  rows: FormArray = this.fb.array([]);
    
  constructor(private http: HttpClient, private router: Router, private api: ApiService, private formBuilder: FormBuilder, private fb: FormBuilder) { }


  ngOnInit() {

    this.campaignForm = this.formBuilder.group({
      'dealerid' : [null],
      'dealerName' : [null],
      'campaignid' : [null, Validators.required],
      'campaignname' : [null, Validators.required],
      'adid' : [null, Validators.required],
      'adname' : [null, Validators.required],
      'creativeid' : [null, Validators.required],
      'campaignadtype' : [null],
      'campaignexpdate' : [null, Validators.required],
      'adexpdate' : [null, Validators.required],
      'publisher' : [null],
      'creativeobject' :  [null],
      'vehicleid':  [null],
      'vehiclevin':  [null],
      'make':  [null, Validators.required],
      'model':  [null, Validators.required],
      'year':  [null, Validators.required],
      'color':  [null, Validators.required],
      'trim':  [null],
      'vehicleodometer':  [null],
      'vehicletitle': [null],
      'vehicleprice': [null],
      'pacode': [null, Validators.required],
      'postalCode': [null, Validators.required],
      'disclaimers':  this.rows

    }, err => {
        if(err.status === 401) {
          this.router.navigate(['login']);
        }
    });

    this.data.forEach((d: Disclaimers) => this.addRow(d, false));
    this.updateView();

  }

  onFormSubmit(formc:NgForm) {

    this.api.postCampaign(formc)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/campaign-details', id]);
        }, (err) => {
          console.log(err);
        });
  }

  addRow(d?: Disclaimers, noUpdate?: boolean) {
    const row = this.fb.group({
      'disclaimer'   : [d && d.disclaimer ? d.disclaimer : null, []]
    });
    this.rows.push(row);
    if (!noUpdate) { this.updateView(); }
  }

  updateView() {
    this.dataSource.next(this.rows.controls);
  }

  removeEmptyRows() {

    this.data = _.filter(this.data, discs=>discs.disclaimer != null);
    this.data = _.filter(this.data, discs=>discs.disclaimer.length > 0);
    while (this.rows.length !== 0) {
      this.rows.removeAt(0);
    }
    this.data.forEach((d: Disclaimers) => this.addRow(d, false));
    this.updateView();
    this.campaignForm.updateValueAndValidity;
  }
}
