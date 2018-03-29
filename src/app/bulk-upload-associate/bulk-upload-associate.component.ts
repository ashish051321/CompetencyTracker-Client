import { Component, OnInit } from '@angular/core';

import { schema as excelSchema } from '../../assets/scripts/excelSchema';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

declare var $: any;
declare var readXlsxFile: any;

@Component({
  selector: 'app-bulk-upload-associate',
  templateUrl: './bulk-upload-associate.component.html',
  styleUrls: ['./bulk-upload-associate.component.css']
})
export class BulkUploadAssociateComponent implements OnInit {

  private mydata: any;//this will save the final JSON
  private mySchema;
  private items: any;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {

    this.items = af.list('/messages', { query: { limitToLast: 50  }  });

    this.mySchema = excelSchema;

  }

  ngOnInit() {

  }

  onFileSubmit(files) {
    console.log(files);
    readXlsxFile(files[0], { schema: this.mySchema }).then(({ rows, errors }) => {
      // `errors` have shape `{ row, column, error, value }`.
      console.log("heya", rows);
      this.mydata = rows;
    });


    // now we have got the excel prased as JSON, ican preprocess it and go ahead with saving into the Firebase database.
    this.preProcessMyJSON();





  }//onFileSubmit function ends 


  preProcessMyJSON() {
    // act on this.mydata
  }

}