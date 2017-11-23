import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBserviceService } from '../dbservice.service';

declare var jQuery:any;



@Component({
  selector: 'app-associatelist',
  templateUrl: './associatelist.component.html',
  styleUrls: ['./associatelist.component.css']
})

export class AssociatelistComponent implements OnInit {
  databaseMessage;
  associateList;
  originalAssociateList;
  dataReceived = false;
  projectList = ["Dev", "QA", "ITIS", "Customer Support"];
  selectedProject = "--All--"

  constructor(private dbService: DBserviceService, private router: Router) {
    this.dataReceived = false;
  }

  ngOnInit() {
    this.getAllAssociates();
  }

  getAllAssociates(){
    this.dbService.getAllAssociates().subscribe(data => {
      
      console.log(data);
      this.originalAssociateList = data;
      this.originalAssociateList.reverse();
      this.associateList = Array.from(this.originalAssociateList);
      this.projectList = this.getUniqueProjects();
      this.dataReceived = true;
      // this.dbService.setAssociate(data);
    });


  }

  editAssociate(associateEmpId) {
    //  console.log(associateEmpId);
    //using query Parameters in Angular Routes
    this.router.navigate(['/associate'],{ queryParams: { empid: associateEmpId } });
  }

  deleteAssociate(associateEmpId) {
    this.dbService.deleteAssociate(associateEmpId).subscribe((message) => {
      this.databaseMessage = message;
      jQuery('#promptOnAction').modal('show');
      this.getAllAssociates();
    });
  }

  extractPrimaryCompetency(associate) {
    if (associate.competencies.length > 0) {

      let result = (associate.competencies.filter(function (comp) {
        return (comp.isPrimary == true);
      }))
      return result[0].competency;
    }

    else {
      return "--";
    }

  }

  sortByEmpID() {
    this.associateList.sort(function (prev, next) {
      return prev.empid - next.empid;

    });
  }

  sortByName() {
    this.associateList.sort(function (prev, next) {
      if (prev.fullname > next.fullname) {
        return 1;
      }
      if (prev.fullname < next.fullname) {
        return -1;
      }
      return 0;

    });

  }//sortByName ends

  filterByEmpID(empid) {
    // if (empid.toString().trim().length == 0) {
    //   this.associateList = this.originalAssociateList;
    // }
    this.associateList = this.originalAssociateList.filter((associate) => {
      return ((associate.empid.toString().indexOf(empid)) != -1);
    });
  }//filterbyempid fucntion ends



  filterByName(name) {
    // if (empid.toString().trim().length == 0) {
    //   this.associateList = this.originalAssociateList;
    // }
    this.associateList = this.originalAssociateList.filter((associate) => {
      return ((associate.fullname.toString().toUpperCase().indexOf(name.toUpperCase())) != -1);
    });
  }//filterByName fucntion ends


  filterByProject(projectName) {
    // this function   was called like this - (ngModelChange) =  filterByProject($event) 
    //and I am directly getting the selected value in the dropdown !! Thanks Angular :)

    this.associateList = this.originalAssociateList.filter((associate) => {
      return (associate.projectname.indexOf(projectName) != -1);
    });

  }


  getUniqueProjects() {
    let uniqueProjectList = [];
    for (let i = 0; i < this.originalAssociateList.length; i++) {
      let myprojectList = this.originalAssociateList[i].projectname;
      for (let j = 0; j < myprojectList.length; j++) {
        if (uniqueProjectList.indexOf(myprojectList[j]) == -1) {
          //insert
          uniqueProjectList.push(myprojectList[j]);
        }
      }
    }//out for loop ends

    return uniqueProjectList;
  }





}//Component Class ends
