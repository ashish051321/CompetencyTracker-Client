const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const http = require('http');
var favicon = require('serve-favicon') //to solve the chrome infinite loop problem.


const app = express(); //this is the start of use of express framework
//Body Parser Middleware

app.use(bodyParser.urlencoded({ extended: true }));// to handle complex objects, extended needs to be set to true.
app.use(bodyParser.json());//to hadle json data


app.post('/insertAssociate', function (req, res) {

    console.log("I was called");
    console.log(req.headers);
    console.log("---------------------");
    console.log(req.body);
    let myAssociate = req.body;//req.body, by virtue of using bodyParser middleware is directly the bject that we had sent. So, no hassles.
    console.log(myAssociate.empid);//I am able to access the properties of my object.
    res.status(200).send("yay");//you have to send a reply back to complete the post request sequence.

});


app.listen(9500, function () {
    console.log('Express app listening on port 9500!')
});


sendDataToServer(url: string, associate)
{
    $.ajax({
        url: url,
        data: associate,
        type: "POST",
        dataType: 'json',
        // contentType: "application/json",
        success: function (json) {
            console.log("Ajax Return :" + json);
        }
    });

}




associate = {
    empid: '666999',
    fullname: 'Tom Marvolo Riddle',
    designation: 'Senior Associate',
    startdate: '2015-08-30',
    enddate: '',
    projectname: ['ITIS'],
    location: 'onsite',
    experience: '9',
    manager: ['Angie'],
    competencies:
    [{
        competency: 'TIBCO',
        competencyexp: '1',
        expertiselevel: 'E1',
        pracexp: 'Yes',
        isPrimary: true
    }],
    certifications: [{
        certification: 'Agile Fundamentals', aqdate: '2016-09-14'
    }]
};