import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AssociatelistComponent } from './associatelist/associatelist.component';
import { AssociateComponent } from './associate/associate.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { CertificationListComponent } from './certification-list/certification-list.component';
import { CompetencyListComponent } from './competency-list/competency-list.component';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { BulkUploadAssociateComponent } from './bulk-upload-associate/bulk-upload-associate.component';
import { ReportsComponent } from './reports/reports.component';

import {DBserviceService} from './dbservice.service';

import {HttpClientModule} from '@angular/common/http';

//importing NG Bootstrap for our project
//Now, this is for the components. On top of this, please
// check angular-cli.json where we have added the native bootstrap along with jquery as well.


import { CustomDropdownComponent } from './custom-dropdown/custom-dropdown.component';
import { EditAssociateComponent } from './edit-associate/edit-associate.component';
import { DummyComponentComponent } from './dummy-component/dummy-component.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'associateList', component: AssociatelistComponent },
  { path: 'associate/:empid', component: AssociateComponent},
  { path: 'associate', component: AssociateComponent},
  { path: 'projectList', component: ProjectListComponent},
  { path: 'competencyList', component: CompetencyListComponent},
  { path: 'certificationList', component: CertificationListComponent},
  { path: 'managerList', component: ManagerListComponent},
  { path: 'reports', component: ReportsComponent},
  { path: 'bulkUploadAssociate', component: BulkUploadAssociateComponent},
  { path: 'editassociate', component: EditAssociateComponent},
  { path: 'dummy', component: DummyComponentComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AssociatelistComponent,
    AssociateComponent,
    ProjectListComponent,
    CertificationListComponent,
    CompetencyListComponent,
    ManagerListComponent,
    BulkUploadAssociateComponent,
    ReportsComponent,
    CustomDropdownComponent,
    EditAssociateComponent,
    DummyComponentComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, RouterModule.forRoot(appRoutes,
      { enableTracing: false })
  ],
  providers: [DBserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
