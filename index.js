const fs = require("fs")
const readline = require("readline");
const {parse} = require('csv-parse');
const sgMail = require('@sendgrid/mail');
const sgHelpers = require('@sendgrid/helpers');
const { create } = require("domain");

const Personalization = sgHelpers.classes.Personalization;
const API_KEY = '<YOUR API KEY HERE>';//Add your own SendGrid API key here
sgMail.setApiKey(API_KEY);
var csvData=[];//sets up array to hold the csv data read in the future

//file reader for the csv. set to read each row as: FIRSTNAME,LASTNAME,SUBJECT,EMAIL,CAPTION,REC1,IMG1,REC2,IMG2,REC3,IMG3,REC4,IMG4,REC5,IMG5
fs.createReadStream("UserDataRecs.csv")
.pipe(parse({delimiter: ','}))
.on('data', function(csvrow) {
  console.log(csvrow);
  //Forms the email message according to the read in data
  let msg = {
    from: '<VERIFIED EMAIL HERE>',//use your verified sender's email on SendGrid
    to:csvrow[3],
    name: csvrow[0]+" "+csvrow[1],
    personalizations: [],
    
    templateId: 'd-2bcba09e8e5d411faf80df32c4e91129',
     dynamic_template_data: {
      subject: csvrow[2],
      first_name: csvrow[0],
      caption: csvrow[4],
      
      rec1desc:csvrow[5],
      rec1img:csvrow[6],
      
      rec2desc:csvrow[7],
      rec2img:csvrow[8],
      
      rec3desc:csvrow[9],
      rec3img:csvrow[10],
      
      rec4desc:csvrow[11],
      rec4img:csvrow[12],
      
      rec5desc:csvrow[13],
      rec5img:csvrow[14]
      },
  };
  //console.log(csvrow);
  const personalization1 = new Personalization();
  personalization1.setTo(csvrow[3]);
  personalization1.setSubject(csvrow[2]);
  msg.personalizations.push(personalization1);
  
//Sends out each email for the entire csv file's list
sgMail
.send(msg)
.then(response => console.log('Email Sent!'))
.catch((error)=> console.log(error.response.body));
})
.on('end',function() {
});


