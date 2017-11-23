import { Component, OnInit } from '@angular/core';
import { DBserviceService } from '../dbservice.service';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

declare var jQuery: any;

@Component({
  selector: 'dummy-component',
  templateUrl: './dummy-component.component.html',
  styleUrls: ['./dummy-component.component.css']
})
export class DummyComponentComponent implements OnInit {

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

  editMode = false;
  formErrors = false;
  associateToBeEdited;
  databaseMessage = null;
  constructor(private dbService: DBserviceService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let associateEmpID = "none";
    console.log(this.route.queryParams);
    this.route.queryParams.subscribe(params => {
      console.log(params); // {empid: "899104"}
      if (params.empid) {
        //we received an edit request
        // console.log(this.dbService.getAssociate(params.empid));
        let tempAssociate = this.dbService.getAssociate(params.empid);
        //we are doing to remove all the extraneous details like _id etc from the object we got from the service
        this.associateToBeEdited = {
          empid: tempAssociate.empid,
          fullname: tempAssociate.fullname,
          designation: tempAssociate.designation,
          startdate: tempAssociate.startdate,
          enddate: tempAssociate.enddate,
          projectname: tempAssociate.projectname,
          location: tempAssociate.location,
          experience: tempAssociate.experience,
          manager: tempAssociate.manager,
          competencies: tempAssociate.competencies,
          certifications: tempAssociate.certifications
        };
        this.competenciesAdded = tempAssociate.competencies;
        this.certificationsAdded = tempAssociate.certifications;
        this.editMode = true;
      }
      else {
        //we received a new associate creation request.
        this.associateToBeEdited = {
          empid: "",
          fullname: "",
          designation: "",
          startdate: "",
          enddate: "",
          projectname: [],
          location: "",
          experience: "",
          manager: [],
          competencies: [],
          certifications: []
        };
      }
    });


  }

  onSubmitCompetency(myFormValues) {
    if (this.competenciesAdded.length == 0)//this is the first competency, so make it primary by default.
    {
      myFormValues.isPrimary = true;
    }
    else {
      myFormValues.isPrimary = false;
    }
    console.log(myFormValues);
    jQuery("#competencyModal").modal("hide");
    this.competenciesAdded.push(myFormValues);//this is an object that we are adding
    // this.displayCompetencies();//display the same on the page.
  }

  makePrimaryCompetency(competencyItem) {
    console.log(competencyItem);
    this.competenciesAdded.forEach(function (element) {
      element.isPrimary = false;
    });
    competencyItem.isPrimary = true;

  }

  deleteCompetency(competencyItem) {
    console.log(competencyItem);
    this.competenciesAdded.splice(this.competenciesAdded.indexOf(competencyItem), 1);
  }

  // Certification List Related:----------------------

  onSubmitCertification(myFormValues) {

    jQuery("#certificationModal").modal("hide");
    this.certificationsAdded.push(myFormValues);
  }

  deleteCertification(certificationItem) {
    this.certificationsAdded.splice(this.certificationsAdded.indexOf(certificationItem), 1);
  }

  // On submission of the main associate form------------------------------------------

  onSubmitAssociate(myFormValues) {
    console.log(myFormValues);
    if (myFormValues.empid.length == 0) {
      this.formErrors = true;
      setTimeout(function () { jQuery('#errorPrompt').focus(); }, 100);

    }
    else {
      myFormValues.competencies = this.competenciesAdded;
      myFormValues.cetifications = this.certificationsAdded;
      this.associateToBeEdited.location = myFormValues.location;
      this.associateToBeEdited.experience = myFormValues.experience;
      this.associateToBeEdited.competencies = this.competenciesAdded;
      this.associateToBeEdited.certifications = this.certificationsAdded;

      //Now, I am sending this to my dbService. If it was fetched from dbService, that, is it was edited, dbService should replace the previous one.
      //But, if this has been created new, dbService should insert a new record.
      // console.log("THe String object is:----");
      // let objstr = JSON.stringify(this.associateToBeEdited);      
      // console.log(objstr);

      // console.log("THe object created from the stringified json is:----");
      // let convObj =  JSON.parse(objstr);
      // console.log(JSON.stringify(convObj));

      //when this insertAssociate method is called, we are sending data to server
      // and then to mongodb from the server.
      this.dbService.insertAssociate(this.associateToBeEdited).subscribe(message => {
        this.databaseMessage = message;
        jQuery('#promptOnSave').modal('show');
      });
      //navigating to the home page.

    }

  }

  navigateToHome() {
    jQuery('#promptOnSave').modal('hide');
    this.router.navigate(['/home']);
  }

  projectOptionClickHandler() {
    // console.log("I was called projectOptionClickHandler");
    let projectLabel = jQuery('#project').val();
    console.log(jQuery('#project').val());

    if (this.associateToBeEdited.projectname.indexOf(projectLabel) == -1) {
      this.associateToBeEdited.projectname.push(projectLabel);
    }

  }

  removeProject(projectLabel) {
    this.associateToBeEdited.projectname.splice(this.associateToBeEdited.projectname.indexOf(projectLabel), 1);
    jQuery('#project').val("");
  }

  removeDesignation(dlabel) {
    this.associateToBeEdited.designation = "";
    jQuery('#designation').val("");
  }

  managerOptionClickHandler() {
    let managerLabel = jQuery('#manager').val();
    console.log(jQuery('#manager').val());

    if (this.associateToBeEdited.manager.indexOf(managerLabel) == -1) {
      this.associateToBeEdited.manager.push(managerLabel);
    }
  }

  removeManager(managerLabel) {
    this.associateToBeEdited.manager.splice(this.associateToBeEdited.manager.indexOf(managerLabel), 1);
    jQuery('#manager').val("");

  }


}


