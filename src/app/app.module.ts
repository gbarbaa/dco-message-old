import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileDropModule } from 'ngx-file-drop';
// Import your library
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ModalModule , TooltipModule } from 'ngx-bootstrap';
import { Angular2CsvModule } from 'angular2-csv';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from './loader-interceptor.service';

import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatSelectModule,
  MatButtonModule,
  MatCardModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatTabsModule,
  MatDialogModule } from "@angular/material";

import { AppComponent } from './app.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignDetailComponent } from './campaign-detail/campaign-detail.component';
import { CampaignCreateComponent } from './campaign-create/campaign-create.component';
import { CampaignEditComponent } from './campaign-edit/campaign-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DcoComponent } from './dco/dco.component';
import { DcoDetailComponent } from './dco-detail/dco-detail.component';
import { DcoCreateComponent } from './dco-create/dco-create.component';
import { DcoEditComponent } from './dco-edit/dco-edit.component';
import { DcoDialogComponent } from './dco-dialog/dco-dialog.component';
import { LoaderComponent } from './loader/loader.component';
import { SafeHtmlPipe } from './dco-create/safehtml.pipe';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Sign Up' }
  },
  {
    path: 'campaigns',
    component: CampaignComponent,
    data: { title: 'Campaign List' }
  },
  {
    path: 'campaign-details/:id',
    component: CampaignDetailComponent,
    data: { title: 'Campaign Details' }
  },
  {
    path: 'campaign-create',
    component: CampaignCreateComponent,
    data: { title: 'Create Campaign' }
  },
  {
    path: 'campaign-edit/:id',
    component: CampaignEditComponent,
    data: { title: 'Edit Campaign' }
  },
  {
    path: 'dcos',
    component: DcoComponent,
    data: { title: 'DCOs List' },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'dco-details/:id',
    component: DcoDetailComponent,
    data: { title: 'Dco Details' }
  },
  {
    path: 'dco-create',
    component: DcoCreateComponent,
    data: { title: 'Create Dco' }
  },
  {
    path: 'dco-edit/:id',
    component: DcoEditComponent,
    data: { title: 'Edit Dco' }
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**',
    component: NotfoundComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CampaignComponent,
    CampaignDetailComponent,
    CampaignCreateComponent,
    CampaignEditComponent,
    LoginComponent,
    SignupComponent,
    NotfoundComponent,
    DcoComponent,
    DcoDetailComponent,
    DcoCreateComponent,
    DcoEditComponent,
    DcoDialogComponent,
    LoaderComponent,
    SafeHtmlPipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes,
      { onSameUrlNavigation: 'reload' } ),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatTabsModule,
    FileDropModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDialogModule,
    // Specify your library as an import
    SlickCarouselModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    Angular2CsvModule
  ],
  exports: [RouterModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [DcoDialogComponent]
})
export class AppModule { }