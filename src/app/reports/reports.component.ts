import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor() { }

  ngOnInit() {


  }//ngOnInit


  runD3() {
    console.log("runD3 called !!");
    
    // d3.select("#chart").selectAll("p")
    //   .data(["Ashish","Anil","Tejas","Siddhesh","Rahul","Rohit"])
    //   .enter().append("span")
    //   .text(function(d){
    //       console.log(d +" wins");
    //       return d +" wins";
    //   });


    d3.select("#chart").selectAll("p")
    .data(["Ashish","Anil","Tejas","Siddhesh","Rahul","Rohit"]).text("Hero")
    .enter().append("p")
    .text(function() {
      return "hsl(" + Math.random() * 360 + ",100%,50%)";
      // return "hello";
    });

    d3.select("#chart").selectAll("p").remove();



      // d3.selectAll("p").style("background-color", function() {
      //   return "hsl(" + Math.random() * 360 + ",100%,50%)";
      // });

  }//runD3

}
