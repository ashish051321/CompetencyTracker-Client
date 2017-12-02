import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-bulk-upload-associate',
  templateUrl: './bulk-upload-associate.component.html',
  styleUrls: ['./bulk-upload-associate.component.css']
})
export class BulkUploadAssociateComponent implements OnInit {
  
    constructor() { }
  
    ngOnInit() {
  
    }
  
    onFileSubmit(files) {
      console.log(files);
  
      // Create a new FormData object.
      var formData = new FormData();
  
      // Loop through each of the selected files.//in th ui, we are allowing just one file selectin, so the loop is kinda redundant !
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
  
        // Check the file type.
        // if (!file.type.match('*.xlsx')) {
        //   continue;
        // }
  
        // Add the file to the request.
        formData.append('associateBulkList', file, file.name);
      }
  
      // Set up the request.
      var xhr = new XMLHttpRequest();
  
      xhr.open('POST', 'http://localhost:9500/bulkupload', true);
       
      // Send the Data.
       xhr.send(formData);


      // Set up a handler for when the request finishes.
      xhr.onload = function () {
        if (xhr.status == 200) {
          // File(s) uploaded.
          document.getElementById("fileUploadSubmit").innerHTML = 'Uploaded !!';
          document.getElementById("fileUploadSubmit").style.backgroundColor = "lightgreen";
  
          setTimeout(function(){
            document.getElementById("fileUploadSubmit").innerHTML = 'Upload File';
            document.getElementById("fileUploadSubmit").style.backgroundColor = "#0069D9";
   
          },2000);
          
        } else {
          // alert('An error occurred!');
          $("#fileUploadSubmit").innerHTML = 'Error ! Try Again';
        }
      };
  
     
  
  
  
    }
  
  }