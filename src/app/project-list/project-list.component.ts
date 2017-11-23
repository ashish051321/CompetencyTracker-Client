import { Component, OnInit } from '@angular/core';
import { DBserviceService } from '../dbservice.service';

declare var jQuery:any;


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  
    existingProjects: any;
    projectsToDisplay: any;
  
    constructor(private dbService: DBserviceService) {
    }
  
    ngOnInit() {
      this.getAllProjects();//when the page loads I want a fresh copy of my competency data.
    }
  
    insertProject(competencyForm) {
      this.dbService.insertProject(competencyForm).subscribe(data => {
        console.log(data);
        this.getAllProjects();//after iserting I am refreshing my localcopy 
      });
      jQuery("#projectName").val("");
    }
  
    getAllProjects() {
      this.dbService.getAllProjects().subscribe((data) => {
        this.existingProjects = data;
        this.projectsToDisplay = this.existingProjects.slice();//creating a new array;
        this.projectsToDisplay.reverse();
      });
  
    }
  
    deleteProj(projectName) {
      this.dbService.deleteProject(projectName).subscribe(data => {
        console.log(data);
        this.getAllProjects();//after iserting I am refreshing my localcopy 
      });
    }
  
    searchByName(projName) {
      this.projectsToDisplay = this.existingProjects.filter(function (projObj:any) {
        return ((projObj.projectName.toUpperCase().indexOf(projName.toUpperCase()) != -1)? true : false);
      });
  
    }
  
    clearSearch() {
      this.projectsToDisplay = this.existingProjects.slice();//creating a new array;
      this.projectsToDisplay.reverse();
      jQuery("#projNameToSearch").val("");
    }
  
  }
  