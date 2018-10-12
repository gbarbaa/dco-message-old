import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { Observable } from 'rxjs';
import * as _ from "lodash";
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import {AbstractControl,  FormControl, FormGroupDirective, FormBuilder, FormGroup, FormArray, NgForm, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { Disclaimers } from '../lib/service/data/disclaimers.model';

import { UploadEvent, UploadFile } from 'ngx-file-drop';

import { Campaign } from '../lib/service/data/campaign';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})

export class CampaignComponent implements OnInit {

  campaignForm: FormGroup;
  id:string='';
  dealerid: string='';
  dealerName: string='';
  campaignid:string='';
  campaignname:string='';
  adid:string='';
  adname:string='';
  creativeid:string='';
  campaignadtype:string='';
  campaignexpdate:string='';
  adexpdate:string='';
  publisher:string='';
  creativeobject: Object;
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
  disclaimers:  [{
    disclaimer: String;
  }];

  public valueSearch: string = '';
  public search: string = null;
  campaigns: any;
  groupedCampaignIds: any;
  groupedCampaigns: any;
  private selectedCampaign: Campaign;

  data: Disclaimers[] = [ { disclaimer: new String } ];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns = ['disclaimer'];
  rows: FormArray = this.fb.array([]);


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

      this.api.getCampaigns()

        .subscribe(res => {

        this.campaigns = res;

        this.groupedCampaigns = _.groupBy(this.campaigns, campaign=>campaign.campaignid);

        this.groupedCampaignIds = Object.keys(this.groupedCampaigns);

        this.selectedCampaign =  this.groupedCampaignIds[0];

        this.data = this.groupedCampaigns[this.groupedCampaignIds[0]][0].disclaimers;
      
        this.data.forEach((d: Disclaimers) => this.addRow(d, false));
        
        this.getCampaign(this.groupedCampaigns, this.groupedCampaignIds[0], 0);

      }, err => {
        console.log(err);
        if(err.status === 401) {
          this.router.navigate(['login']);
        }
      });

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
        'disclaimers': this.rows
      });
      this.updateView();
    }

    
    private panelCollapse = false;
    private selectedCampaignIndex = 0;
    private selectedAd = 0;

    getCampaign(allCampaigns, cId, ad) {

      console.log("allc", allCampaigns)
        this.id = allCampaigns[cId][ad]._id;
        this.campaignForm.setValue({
          dealerid: allCampaigns[cId][ad].dealerid,
          dealerName: allCampaigns[cId][ad].dealerName,
          campaignid: allCampaigns[cId][ad].campaignid,
          campaignname: allCampaigns[cId][ad].campaignname,
          adid: allCampaigns[cId][ad].adid,
          adname: allCampaigns[cId][ad].adname,
          creativeid: allCampaigns[cId][ad].creativeid,
          campaignadtype: allCampaigns[cId][ad].campaignadtype,
          campaignexpdate: allCampaigns[cId][ad].campaignexpdate,
          adexpdate: allCampaigns[cId][ad].adexpdate,
          publisher: allCampaigns[cId][ad].publisher,
          creativeobject: this.files,
          vehicleid: allCampaigns[cId][ad].vehicleid,
          vehiclevin: allCampaigns[cId][ad].vehiclevin,
          make: allCampaigns[cId][ad].make,
          model: allCampaigns[cId][ad].model,
          year: allCampaigns[cId][ad].year,
          color: allCampaigns[cId][ad].color,
          trim: allCampaigns[cId][ad].trim,
          vehicleodometer: allCampaigns[cId][ad].vehicleodometer,
          vehicletitle: allCampaigns[cId][ad].vehicletitle,
          vehicleprice: allCampaigns[cId][ad].vehicleprice,
          pacode: allCampaigns[cId][ad].pacode,
          postalCode: allCampaigns[cId][ad].postalCode,
         disclaimers : allCampaigns[cId][ad].disclaimers
          });
    };

     selectCampaign(key, i){

      this.selectedCampaign = key;
      this.selectedCampaignIndex = i;
      this.selectedAd = 0;
      this.data = this.groupedCampaigns[key][0].disclaimers;
      this.removeEmptyRows();
      this.getCampaign(this.groupedCampaigns, key, this.selectedAd );
    };

    selectAd(a, i){

      this.selectedAd = a;
      this.getCampaign(this.groupedCampaigns, this.selectedCampaign, this.selectedAd );
    };

    toggleCollapse(){
      this.panelCollapse = !this.panelCollapse;
    };

    logout() {
      localStorage.removeItem('jwtToken');
      this.router.navigate(['login']);
    };

    addRow(d?: Disclaimers, noUpdate?: boolean) {
      const row = this.fb.group({
        'disclaimer'   : [d && d.disclaimer ? d.disclaimer : null, []]
      });
      this.rows.push(row);
      if (!noUpdate) { this.updateView(); }
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
  
    updateView() {
      this.dataSource.next(this.rows.controls);
    }

    public files: UploadFile[] = [];
  
    public dropped(event: UploadEvent) {
      this.files = event.files;
      for (const droppedFile of event.files) {
  
        // Is it a file?
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
  
            // Here you can access the real file
            console.log("file", droppedFile.relativePath, file);
            this.campaignForm.controls['creativeobject'].setValue(file);
            this.campaignForm.updateValueAndValidity;
  
          });
        } else {
          // It was a directory (empty directories are added, otherwise only files)
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
          console.log("folder", droppedFile.relativePath, fileEntry);
          this.campaignForm.controls['creativeobject'].setValue(fileEntry);
          this.campaignForm.updateValueAndValidity;
        }
      }
    };
  
    public fileOver(event){
      console.log(event);
    };
  
    public fileLeave(event){
      console.log(event);
    } ;

    onFormSubmit(form:NgForm) {
      this.api.updateCampaign(this.id, form)
        .subscribe(res => {
            let id = res['_id'];
            this.router.navigate(['/campaign-details', id]);
          }, (err) => {
            console.log(err);
          }
        );
    };
  
    deleteCampaign() {
      this.api.deleteCampaign(this.id)
        .subscribe(res => {
          this.router.navigate(['/campaign-details', this.id]);
          }, (err) => {
            console.log(err);
          }
        );
    }
}

export class CampaignDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getCampaigns();
  }

  disconnect() {

  }
}

export interface FileSystemEntry {
  name: string,
  isDirectory: boolean
  isFile: boolean
}

export interface FileSystemFileEntry extends FileSystemEntry {
  isDirectory: false
  isFile: true
  file(callback: (file: File) => void): void
}

export interface FileSystemDirectoryReader {
  readEntries(
    successCallback: (result: FileSystemEntry[]) => void,
    errorCallback?: (error: DOMError) => void,
  ): void
}

export interface FileSystemFlags {
  create?: boolean
  exclusive?: boolean
}

export interface FileSystemDirectoryEntry extends FileSystemEntry {
  isDirectory: true
  isFile: false
  createReader(): FileSystemDirectoryReader
  getFile(
    path?: USVString,
    options?: FileSystemFlags,
    successCallback?: (result: FileSystemFileEntry) => void,
    errorCallback?: (error: DOMError) => void,
  ): void
  getDirectory(
    path?: USVString,
    options?: FileSystemFlags,
    successCallback?: (result: FileSystemDirectoryEntry) => void,
    errorCallback?: (error: DOMError) => void,
  ): void
}






