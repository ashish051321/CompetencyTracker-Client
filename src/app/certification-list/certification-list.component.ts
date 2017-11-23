import { Component, OnInit } from '@angular/core';
import { DBserviceService } from '../dbservice.service';

declare var jQuery:any;

@Component({
  selector: 'app-certification-list',
  templateUrl: './certification-list.component.html',
  styleUrls: ['./certification-list.component.css']
})
export class CertificationListComponent implements OnInit {
  
    existingCerts: any;
    certsToDisplay: any;
  
    constructor(private dbService: DBserviceService) {
    }
  
    ngOnInit() {
      this.getAllCerts();//when the page loads I want a fresh copy of my competency data.
    }
  
    insertCert(competencyForm) {
      this.dbService.insertCert(competencyForm).subscribe(data => {
        console.log(data);
        this.getAllCerts();//after iserting I am refreshing my localcopy 
      });
      jQuery("#certificationName").val("");
    }
  
    getAllCerts() {
      this.dbService.getAllCerts().subscribe((data) => {
        this.existingCerts = data;
        this.certsToDisplay = this.existingCerts.slice();//creating a new array;
        this.certsToDisplay.reverse();
      });
  
    }
  
    deleteCert(certName) {
      this.dbService.deleteCert(certName).subscribe(data => {
        console.log(data);
        this.getAllCerts();//after iserting I am refreshing my localcopy 
      });
    }
  
    searchByName(certName) {
      this.certsToDisplay = this.existingCerts.filter(function (certObj:any) {
        return ((certObj.certificationName.toUpperCase().indexOf(certName.toUpperCase()) != -1)? true : false);
      });
  
    }
  
    clearSearch() {
      this.certsToDisplay = this.existingCerts.slice();//creating a new array;
      this.certsToDisplay.reverse();
      jQuery("#certNameToSearch").val("");
    }
  
  }
  