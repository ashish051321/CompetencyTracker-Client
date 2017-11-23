import { Component, OnInit } from '@angular/core';
import { DBserviceService } from '../dbservice.service';

declare var jQuery:any;



@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css']
})
export class ManagerListComponent implements OnInit {
  
    existingManagers: any;
    managersToDisplay: any;
  
    constructor(private dbService: DBserviceService) {
    }
  
    ngOnInit() {
      this.getAllManagers();//when the page loads I want a fresh copy of my competency data.
    }
  
    insertManager(competencyForm) {
      this.dbService.insertManager(competencyForm).subscribe(data => {
        console.log(data);
        this.getAllManagers();//after iserting I am refreshing my localcopy 
      });
      jQuery("#managerName").val("");
    }
  
    getAllManagers() {
      this.dbService.getAllManagers().subscribe((data) => {
        this.existingManagers = data;
        this.managersToDisplay = this.existingManagers.slice();//creating a new array;
        this.managersToDisplay.reverse();
      });
  
    }
  
    deleteManager(managerName) {
      this.dbService.deleteManager(managerName).subscribe(data => {
        console.log(data);
        this.getAllManagers();//after iserting I am refreshing my localcopy 
      });
    }
  
    searchByName(mgrName) {
      this.managersToDisplay = this.existingManagers.filter(function (mgrObj:any) {
        return ((mgrObj.managerName.toUpperCase().indexOf(mgrName.toUpperCase()) != -1)? true : false);
      });
  
    }
  
    clearSearch() {
      this.managersToDisplay = this.existingManagers.slice();//creating a new array;
      this.managersToDisplay.reverse();
      jQuery("#projNameToSearch").val("");
    }
  
  }
  