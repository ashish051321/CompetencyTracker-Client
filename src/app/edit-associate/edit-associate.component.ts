import { Component, OnInit } from '@angular/core';
import { DBserviceService } from '../dbservice.service';

import {Router} from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-edit-associate',
  templateUrl: './edit-associate.component.html',
  styleUrls: ['./edit-associate.component.css']
})
export class EditAssociateComponent implements OnInit {
  experienceYears = ["Fresher", "< 1", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, "> 15"];
  designationList = ["Associate", "Senior Associate", "Team Lead", "Project Manager", "Delivery Manager"];
  projectList = ["Dev", "QA", "ITIS", "Customer Support"];
  competencyList = ["Java", "Dot Net", "TIBCO", "Tableau", "SSIS"];
  competencyExpertiseLevel = ["E0", "E1", "E2"];
  managerList = ["Wayne", "Nish", "Angie", "Mike", "Taylor"];
  certificationList = ["Oracle", "Biztalk Certification", "Agile Fundamentals", "Scrum Master"];
  primaryCompetency;

  competenciesAdded = [];
  certificationsAdded = [];

  myassociate;

  constructor(private dbService: DBserviceService, private router:Router) {
  }

  
  ngOnInit() {
    // this.myassociate = this.dbService.getAssociateToBeEdited();
    
  }

  onSubmitCompetency(myFormValues) {
    if(this.competenciesAdded.length == 0)//this is the first competency, so make it primary by default.
    {
      myFormValues.isPrimary = true;
    }
    else{
      myFormValues.isPrimary = false;
    }
    console.log(myFormValues);
    jQuery("#competencyModal").modal("hide");
    this.competenciesAdded.push(myFormValues);//this is an object that we are adding
    // this.displayCompetencies();//display the same on the page.
  }

  makePrimaryCompetency(competencyItem){
    console.log(competencyItem);
    this.competenciesAdded.forEach(function(element){
      element.isPrimary = false;
    });
    competencyItem.isPrimary = true;

  }

  deleteCompetency(competencyItem)
  {
    console.log(competencyItem);
    this.competenciesAdded.splice(this.competenciesAdded.indexOf(competencyItem),1);
  }

// Certification List Related:----------------------

onSubmitCertification(myFormValues){
  
  jQuery("#certificationModal").modal("hide");
  this.certificationsAdded.push(myFormValues);  
}

deleteCertification(certificationItem){
  this.certificationsAdded.splice(this.certificationsAdded.indexOf(certificationItem),1);
}

// On submission of the main associate form------------------------------------------

onSubmitAssociate(myFormValues){
  console.log(myFormValues) ;
  myFormValues.competencies= this.competenciesAdded;
  myFormValues.cetifications = this.certificationsAdded;
  this.dbService.insertAssociate(myFormValues);
  this.router.navigate(['/home']);
}

}
