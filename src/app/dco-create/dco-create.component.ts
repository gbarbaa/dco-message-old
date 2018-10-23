import {Component, OnInit,TemplateRef,ElementRef } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {tap, catchError} from 'rxjs/operators';
import {ApiService} from '../api.service';
import { Offers } from '../lib/service/data/offers';
import * as _ from 'lodash';
import {of} from 'rxjs/observable/of';
import {AbstractControl, FormControl, FormGroupDirective, FormBuilder, FormGroup, FormArray, NgForm, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';



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
  id: String = '';
  make: String = '';
  model: String = '';
  year: String = '';
  placementid: String = '';
  postalcode: String = '';
  dealerid: String = '';
  dealerName: String = '';
  dealerurl: String = '';
  modalRef: BsModalRef;
  submittedData: Object ;
  OfferHeadline1: String = '';
  SubHeading1: String = '';
  CTALabel1: String = '';
  CTAURL1: String = '';
  Logo1: String = '';
  VehicleImage1: String = '';
  BackgroundUrl1: String = '';
  DisclosureLabel1: String = '';
  DisclosureCopy1: String = '';
  OfferHeadline2: String = '';
  SubHeading2: String = '';
  CTALabel2: String = '';
  CTAURL2: String = '';
  Logo2: String = '';
  VehicleImage2: String = '';
  BackgroundUrl2: String = '';
  DisclosureLabel2: String = '';
  DisclosureCopy2: String = '';
  OfferHeadline3: String = '';
  SubHeading3: String = '';
  CTALabel3: String = '';
  CTAURL3: String = '';
  Logo3: String = '';
  VehicleImage3: String = '';
  BackgroundUrl3: String = '';
  DisclosureLabel3: String = '';
  DisclosureCopy3: String = '';

  frameForm: FormGroup;
  textForm: FormGroup;
  vehicleForm: FormGroup;
  ctaForm: FormGroup;

  selected = -1;
  offers: [{
    placementid: String;
    offerheadline1: String;
    vehiclename1: String;
    ctalabel1: String;
    ctaurl1: String;
    disclosurelabel1: String;
    logo1: String;
    vehicleimage1: String;
  }];
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
  openId :String = '';
  conditionDiv :String = '';
  title :String = '';

  constructor(private http: HttpClient, private router: Router, private api: ApiService, private formBuilder: FormBuilder, private fb: FormBuilder, private bsmodalservice: BsModalService) {
  }


  ngOnInit() {

    //retrieving from the session//
    var stored_data = sessionStorage.getItem('postalcode');
    console.log('postalcode', stored_data);

    this.dcoForm = this.formBuilder.group({
      'make': [null, Validators.required],
      'model': [null, Validators.required],
      'year': [null, Validators.required],
      'postalcode': [null, Validators.required],
      'placementid': [null, Validators.required],
      'dealerid': [null],
      'dealername': [null],
      'dealerurl': [null],
      'OfferHeadline1': [null],
      'SubHeading1': [null],
      'CTALabel1': [null],
      'CTAURL1': [null],
      'Logo1': [null],
      'VehicleImage1': [null],
      'BackgroundUrl1': [null],
      'DisclosureLabel1': [null],
      'DisclosureCopy1': [null],
      'OfferHeadline2': [null],
      'SubHeading2': [null],
      'CTALabel2': [null],
      'CTAURL2': [null],
      'Logo2': [null],
      'VehicleImage2': [null],
      'BackgroundUrl2': [null],
      'DisclosureLabel2': [null],
      'DisclosureCopy2': [null],
      'OfferHeadline3': [null],
      'SubHeading3': [null],
      'CTALabel3': [null],
      'CTAURL3': [null],
      'Logo3': [null],
      'VehicleImage3': [null],
      'BackgroundUrl3': [null],
      'DisclosureLabel3': [null],
      'DisclosureCopy3': [null],

    });

    this.dcoForm.setValue({
      make: null,
      model: null,
      year: null,
      postalcode: stored_data,
      placementid: null,
      dealerid: null,
      dealername: null,
      dealerurl: null,
      OfferHeadline1: null,
      SubHeading1: null,
      CTALabel1: null,
      CTAURL1: null,
      Logo1: null,
      VehicleImage1: null,
      BackgroundUrl1: null,
      DisclosureLabel1: null,
      DisclosureCopy1: null,
      OfferHeadline2: null,
      SubHeading2: null,
      CTALabel2: null,
      CTAURL2: null,
      Logo2: null,
      VehicleImage2: null,
      BackgroundUrl2: null,
      DisclosureLabel2: null,
      DisclosureCopy2: null,
      OfferHeadline3: null,
      SubHeading3: null,
      CTALabel3: null,
      CTAURL3: null,
      Logo3: null,
      VehicleImage3: null,
      BackgroundUrl3: null,
      DisclosureLabel3: null,
      DisclosureCopy3: null

    });

    this.frameForm = this.formBuilder.group({
      'image': [null, Validators.required],
    });

    this.textForm = this.formBuilder.group({
      'heading': [null, Validators.required],
    });

    this.vehicleForm = this.formBuilder.group({
      'vehicle': [null, Validators.required],
    });

    this.ctaForm = this.formBuilder.group({
      'ctarecord': [null, Validators.required],
      'ctaurl': [null, Validators.required],
    });


  }
  get f() { return this.textForm.controls; }
  onFormSubmit(formc: NgForm) {
    //* Cycle through 5 placementids and remove empty ones before post */
    this.removeEmptyPlacementIds();
    formc = this.dcoForm.value;
    this.api.postDco(formc)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/dcos', id]);
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

  open(frame: TemplateRef<any>,id,condition,title) {

    if(title === "Disclosure") {
      this.textForm = this.formBuilder.group({
        'heading': [null,
          Validators.compose([
            Validators.maxLength(650),
            Validators.required
          ])]
      });
    } else {
      this.textForm = this.formBuilder.group({
        'heading': [null,
          Validators.compose([
            Validators.maxLength(27),
            Validators.required
          ])]
      });
    }
    this.modalRef = this.bsmodalservice.show(frame, { class: 'modal-md' });
    this.openId = id;
    this.conditionDiv = condition;
    this.title = title;
  }


  submitImageData(imgSrc,condition,url?:any) {

    if(condition == 'image') {

      let id: any = this.openId;

      let element = document.getElementById(id);
      element.setAttribute("style", "background-image: url("+imgSrc.image+");");

      let appendValue:any = '';

      if(id == 'logo1') {
        appendValue = document.getElementById('Logo1');
        this.Logo1 = imgSrc.image;
      } else if(id == 'logo2') {
        appendValue = document.getElementById('Logo2');
        this.Logo2 = imgSrc.image;
      } else {
        appendValue = document.getElementById('Logo3');
        this.Logo3 = imgSrc.image;
      }

    } else if(condition == 'heading' || condition == 'subheading' || condition == 'disclosure') {

      let id: any = this.openId;

      let element = document.getElementById(id);
      element.innerHTML = imgSrc.heading;

      if(id == 'heading1') {
        this.OfferHeadline1 = imgSrc.heading;
      } else if(id == 'heading2') {
        this.OfferHeadline2 = imgSrc.heading;
      } else if(id == 'heading3') {
        this.OfferHeadline3 = imgSrc.heading;
      } else if(id == 'subheading1') {
        this.SubHeading1 = imgSrc.heading;
      } else if(id == 'subheading2') {
        this.SubHeading2 = imgSrc.heading;
      } else if(id == 'subheading3') {
        this.SubHeading3 = imgSrc.heading;
      } else if(id == 'disclosure1') {
        this.DisclosureLabel1 = imgSrc.heading;
      } else if(id == 'disclosure2') {
        this.DisclosureLabel2 = imgSrc.heading;
      } else if(id == 'disclosure3') {
        this.DisclosureLabel1 = imgSrc.heading;
      }

    } else if(condition == 'background') {
      let id: any = this.openId;
      let element = document.getElementById(id);
      element.setAttribute("style", "background-color:"+ imgSrc.heading);

      if(id == 'background1') {
        this.BackgroundUrl1 = imgSrc.heading;
      } else if(id == 'background2') {
        this.BackgroundUrl2 = imgSrc.heading;
      } else {
        this.BackgroundUrl3 = imgSrc.heading;
      }

    }  else if(condition == 'vehicle') {

      let id: any = this.openId;

      var element = document.getElementById(id);
      element.setAttribute("style", "background-image: url("+imgSrc.vehicle+");");

      if(id == 'vehicle1') {
        this.VehicleImage1 = imgSrc.vehicle;
      } else if(id == 'vehicle2') {
        this.VehicleImage2 = imgSrc.vehicle;
      } else if(id == 'vehicle3') {
        this.VehicleImage3 = imgSrc.vehicle;
      }


    } else if(condition == 'cta') {

      let x = document.createElement("a");
      x.setAttribute("href", imgSrc.ctaurl);
      x.setAttribute("target", '_blank');
      x.setAttribute("class", 'contentHref');
      x.setAttribute("style", "text-decoration: none;color:white");
      x.innerHTML = imgSrc.ctarecord;
      let id: any = this.openId;
      var element = document.getElementById(id);
      element.innerHTML = "";
      element.appendChild(x);

      if(id == 'cta1') {
        this.CTALabel1 = imgSrc.ctarecord;
        this.CTAURL1 = imgSrc.ctaurl;
      } else if(id == 'cta2') {
        this.CTALabel2 = imgSrc.ctarecord;
        this.CTAURL2 = imgSrc.ctaurl;
      } else if(id == 'cta3') {
        this.CTALabel3 = imgSrc.ctarecord;
        this.CTAURL3 = imgSrc.ctaurl;
      }
    }
    this.modalRef.hide();
  }

// Select Offer and submit

  submitOffer() {

  }

  clickOffer(record) {

    let data = this.offer[record];
    this.defaultHeading = data.Campaign.CampaignType;
    this.OfferHeadline1 = data.Campaign.CampaignType;
    this.OfferHeadline2 = data.Campaign.CampaignType;
    this.OfferHeadline3 = data.Campaign.CampaignType;
    this.defaultSubHeading = data.Campaign.Name;
    this.SubHeading1 = data.Campaign.Name;
    this.SubHeading2 = data.Campaign.Name;
    this.SubHeading3 = data.Campaign.Name;

    this.defaultDisclouser = data.Campaign.Disclaimer;
    this.DisclosureLabel1 = data.Campaign.Disclaimer;
    this.DisclosureLabel2 = data.Campaign.Disclaimer;
    this.DisclosureLabel3 = data.Campaign.Disclaimer;
  }

  onChangeResetFrame() {
    this.defaultHeading = '';
    this.OfferHeadline1 = '';
    this.OfferHeadline2 = '';
    this.OfferHeadline3 = '';
    this.defaultSubHeading = '';
    this.SubHeading1 = '';
    this.SubHeading2 = '';
    this.SubHeading3 = '';

    this.defaultDisclouser = 'Disclosure';
    this.DisclosureLabel1 = '';
    this.DisclosureLabel2 = '';
    this.DisclosureLabel3 = '';
  }


}
