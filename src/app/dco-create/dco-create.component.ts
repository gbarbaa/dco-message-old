import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';
import * as _ from "lodash";
import { of } from 'rxjs/observable/of';
import {AbstractControl,  FormControl, FormGroupDirective, FormBuilder, FormGroup, FormArray, NgForm, Validators} from '@angular/forms';

import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-dco-create',
  templateUrl: './dco-create.component.html',
  styleUrls: ['./dco-create.component.scss']
})

export class DcoCreateComponent implements OnInit {
  dcoForm: FormGroup;
  id:String='';
  make: String='';
  model: String='';
  year: String='';
  placementid: String='';
  zipcode: String='';
  dealerid: String='';
  dealerName: String='';
  dealerurl: String='';


  constructor(private http: HttpClient, private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }


  ngOnInit() {

    //retrieving from the session//
    var stored_data = sessionStorage.getItem('zipcode');
    console.log("zipcode", stored_data);

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

    this.dcoForm.setValue({
      make: null,
      model: null,
      year: null,
      zipcode: stored_data,
      placementid: null,
      dealerid: null,
      dealername: null,
      dealerurl: null
    });
  }

  onFormSubmit(formc:NgForm) {

    this.api.postDco(formc)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/dco-details', id]);
        }, (err) => {
          console.log(err);
        });
  }

}
