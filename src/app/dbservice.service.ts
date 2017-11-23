import { HttpParams } from '@angular/common/http'

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClient } from '@angular/common/http';



declare var jQuery: any;

@Injectable()
export class DBserviceService {
  associatelist;
  competencyList;
  projectList;
  managerList;
  certificationList;

  constructor(private http: HttpClient) {
    this.associatelist = [];
    this.competencyList = [];
    this.projectList = [];
    this.managerList = [];
    this.certificationList = [];
  }

  insertAssociate(myassociate): Observable<any> {

    let tempresult = this.associatelist.filter((associate) => {
      return (associate.empid == myassociate.empid);
    });

    //if old associate
    if (tempresult.length != 0) {
      this.associatelist.splice(this.getIndexOfAssociate(tempresult[0]), 1);
    }
    //In any case push the associate in the associtelist

    this.associatelist.push(myassociate);
    //This Actually returns an observable.
    return (this.sendDataToServer("http://localhost:9500/insertAssociate", myassociate));



  }// insertAssociate ends


  sendDataToServer(url: string, payload): Observable<any> {
    return Observable.create((observer) => {
      jQuery.ajax({
        url: url,
        data: payload,
        type: "POST",
        dataType: 'json',
        // contentType: "application/json",
        success: function (messageObject) {
          observer.next(messageObject.msg);
        }
      });
    });

  }//sendDataToServer



  getIndexOfAssociate(associate) {
    for (let i = 0; i < this.associatelist.length; i++) {
      if (this.associatelist[i].empid == associate.empid)
        return i;
      else
        return -1;
    }
  }




  getAllAssociates(): Observable<any> {
    let self = this;
    return Observable.create((observer) => {
      var url = "http://localhost:9500/getallassociates";
      jQuery.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        // contentType: "application/json",
        success: function (data) {
          self.associatelist = data;
          observer.next(data);
        },
        error: function (msg) {
          observer.next(msg);
        }
      });


    });

  }//getAllAssociates Function ends 

  getAssociate(empid) {
    let tempRes = this.associatelist.filter((associate) => {
      return (associate.empid == empid);
    });
    return (tempRes[0]);
  }

  deleteAssociate(associateEmpId):Observable<any> {
   
    return Observable.create((observer) => {
      let myparams = new HttpParams().set('empid', associateEmpId); 
      this.http.get("http://localhost:9500/deleteassociate",{params: myparams}).subscribe((messageObject:any)=>{
        
      observer.next(messageObject.msg);

      });
      
   });

  }

  // APIs related to the management of Competencies:-

  insertCompetency(competencyObj): Observable<any> {

    return Observable.create((observer) => {
      this.http.post('http://localhost:9500/insertcomp', competencyObj).subscribe((messageObject: any) => {
        // Read the result field from the JSON response.
        // this.competencyList = data['results'];
        // console.log(data);
        observer.next(messageObject.msg);
      });

    });
  }//insertCompetency function ends


  deleteCompetency(competencyNameToDelete): Observable<any> {

    return Observable.create((observer) => {
      this.http.post('http://localhost:9500/deletecomp', { competencyName: competencyNameToDelete }).subscribe((messageObject: any) => {
        // Read the result field from the JSON response.
        // this.competencyList = data['results'];
        // console.log(data);
        observer.next(messageObject.msg);
      });

    });
  }//insertCompetency function ends




  getAllCompetencies(): Observable<any> {
    let self = this;
    return Observable.create((observer) => {
      var url = "http://localhost:9500/getallcomps";
      jQuery.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        // contentType: "application/json",
        success: function (data) {
          self.competencyList = data;
          observer.next(data);
        },
        error: function (msg) {
          observer.next(msg);
        }
      });


    });

  }//getAllCompetencies Function ends 

  // Services to handle the Projects



  insertProject(projectObj): Observable<any> {

    return Observable.create((observer) => {
      this.http.post('http://localhost:9500/insertproj', projectObj).subscribe((messageObject: any) => {
        // Read the result field from the JSON response.
        // this.competencyList = data['results'];
        // console.log(data);
        observer.next(messageObject.msg);
      });

    });
  }//insertCompetency function ends


  deleteProject(projectNameToDelete): Observable<any> {

    return Observable.create((observer) => {
      this.http.post('http://localhost:9500/deleteproj', { projectName: projectNameToDelete }).subscribe((messageObject: any) => {
        // Read the result field from the JSON response.
        // this.competencyList = data['results'];
        // console.log(data);
        observer.next(messageObject.msg);
      });

    });
  }//insertCompetency function ends




  getAllProjects(): Observable<any> {
    let self = this;
    return Observable.create((observer) => {
      var url = "http://localhost:9500/getallprojs";
      jQuery.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        // contentType: "application/json",
        success: function (data) {
          self.projectList = data;
          observer.next(data);
        },
        error: function (msg) {
          observer.next(msg);
        }
      });


    });

  }//getAllProjects Function ends 


  //------ Services related to the management of Managers

  insertManager(managerObj): Observable<any> {

    return Observable.create((observer) => {
      this.http.post('http://localhost:9500/insertmgr', managerObj).subscribe((messageObject: any) => {
        // Read the result field from the JSON response.
        // this.competencyList = data['results'];
        // console.log(data);
        observer.next(messageObject.msg);
      });

    });
  }//insertManager function ends


  deleteManager(managerNameToDelete): Observable<any> {

    return Observable.create((observer) => {
      this.http.post('http://localhost:9500/deletemgr', { managerName: managerNameToDelete }).subscribe((messageObject: any) => {
        // Read the result field from the JSON response.
        // this.competencyList = data['results'];
        // console.log(data);
        observer.next(messageObject.msg);
      });

    });
  }//deleteManager function ends




  getAllManagers(): Observable<any> {
    let self = this;
    return Observable.create((observer) => {
      var url = "http://localhost:9500/getallmgrs";
      jQuery.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        // contentType: "application/json",
        success: function (data) {
          self.managerList = data;
          observer.next(data);
        },
        error: function (msg) {
          observer.next(msg);
        }
      });


    });

  }//getAllManagers Function ends 

  //------ Services related to the management of Managers

  insertCert(certObj): Observable<any> {

    return Observable.create((observer) => {
      this.http.post('http://localhost:9500/insertcert', certObj).subscribe((messageObject: any) => {
        // Read the result field from the JSON response.
        // this.competencyList = data['results'];
        // console.log(data);
        observer.next(messageObject.msg);
      });

    });
  }//insertManager function ends


  deleteCert(certNameToDelete): Observable<any> {

    return Observable.create((observer) => {
      this.http.post('http://localhost:9500/deletecert', { certificationName: certNameToDelete }).subscribe((messageObject: any) => {
        // Read the result field from the JSON response.
        // this.competencyList = data['results'];
        // console.log(data);
        observer.next(messageObject.msg);
      });

    });
  }//deleteManager function ends




  getAllCerts(): Observable<any> {
    let self = this;
    return Observable.create((observer) => {
      var url = "http://localhost:9500/getallcerts";
      jQuery.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        // contentType: "application/json",
        success: function (data) {
          self.certificationList = data;
          observer.next(data);
        },
        error: function (msg) {
          observer.next(msg);
        }
      });

    });

  }//getAllManagers Function ends 





}
