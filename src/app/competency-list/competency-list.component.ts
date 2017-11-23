import { Component, OnInit } from '@angular/core';
import { DBserviceService } from '../dbservice.service';


declare var jQuery: any;

@Component({
  selector: 'app-competency-list',
  templateUrl: './competency-list.component.html',
  styleUrls: ['./competency-list.component.css']
})
export class CompetencyListComponent implements OnInit {

  existingCompetencies: any;
  competenciesToDisplay: any;

  constructor(private dbService: DBserviceService) {
  }

  ngOnInit() {
    this.getAllCompetencies();//when the page loads I want a fresh copy of my competency data.
  }

  insertCompetency(competencyForm) {
    this.dbService.insertCompetency(competencyForm).subscribe(data => {
      console.log(data);
      this.getAllCompetencies();//after iserting I am refreshing my localcopy 
    });
    jQuery("#competencyname").val("");
  }

  getAllCompetencies() {
    this.dbService.getAllCompetencies().subscribe((data) => {
      this.existingCompetencies = data;
      this.competenciesToDisplay = this.existingCompetencies.slice();//creating a new array;
      this.competenciesToDisplay.reverse();
    });

  }

  deleteComp(competencyName) {
    this.dbService.deleteCompetency(competencyName).subscribe(data => {
      console.log(data);
      this.getAllCompetencies();//after iserting I am refreshing my localcopy 
    });
  }

  searchByName(compName) {
    this.competenciesToDisplay = this.existingCompetencies.filter(function (compObj) {
      return ((compObj.competencyName.toUpperCase().indexOf(compName.toUpperCase()) != -1)? true : false);
    });

  }

  clearSearch() {
    this.competenciesToDisplay = this.existingCompetencies.slice();//creating a new array;
    this.competenciesToDisplay.reverse();
    jQuery("#compNameToSearch").val("");
  }

}
