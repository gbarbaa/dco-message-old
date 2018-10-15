import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {tap, catchError} from 'rxjs/operators';
import {ApiService} from '../api.service';
import * as _ from 'lodash';
import {of} from 'rxjs/observable/of';
import {AbstractControl, FormControl, FormGroupDirective, FormBuilder, FormGroup, FormArray, NgForm, Validators} from '@angular/forms';

import {BehaviorSubject} from 'rxjs';

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
  styleUrls: ['./dco-create.component.scss']
})

export class DcoCreateComponent implements OnInit {
  dcoForm: FormGroup;
  id: String = '';
  make: String = '';
  model: String = '';
  year: String = '';
  placementid: String = '';
  zipcode: String = '';
  dealerid: String = '';
  dealerName: String = '';
  dealerurl: String = '';
  vehiclemakes: Vehiclemake[] = [
    {value: 'Ford', viewValue: 'Ford'}
  ];
  vehiclemodels: Vehiclemodel[] = [
    {value: '', viewValue: 'None'},
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


  constructor(private http: HttpClient, private router: Router, private api: ApiService, private formBuilder: FormBuilder) {
  }


  ngOnInit() {

    //retrieving from the session//
    var stored_data = sessionStorage.getItem('zipcode');
    console.log('zipcode', stored_data);

    this.dcoForm = this.formBuilder.group({
      'make': [null, Validators.required],
      'model': [null, Validators.required],
      'year': [null, Validators.required],
      'zipcode': [null, Validators.required],
      'placementid': [null, Validators.required],
      'dealerid': [null],
      'dealername': [null],
      'dealerurl': [null],
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

  onFormSubmit(formc: NgForm) {

    this.api.postDco(formc)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/dco-details', id]);
      }, (err) => {
        console.log(err);
      });
  }

}
