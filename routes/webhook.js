const express = require('express');
const bodyparser = require('body-parser');
const axios = require("axios");
var moment = require('moment');

// Configuration
const expressApp  = express();
expressApp.use(bodyparser.json());
var router = express.Router();
const { dialogflow } = require('actions-on-google')

const app = dialogflow();

// Webhook route
// router.post('/', (req, res) => {  
//     const url = "https://my-json-server.typicode.com/edurekaDemo/noderequest/db";
//     const getData = async url => {
//     try {
//       const response = await axios.get(url);
//       const data = response.data;
//       console.log(data);
//       res.json(data)
//     } catch (error) {
//       console.log(error);
//     }
// };
// getData(url);  
// });

router.post('/', (req, res) => {
  if (req.body.queryResult.action == "input.getMovieInfo") {
    var movieName = req.body.queryResult.parameters['movie_name'];
    axios.get('http://www.omdbapi.com/?t=' + movieName + '&apikey=709c821b')
      .then(function (response) {
        console.log(response);
        //res.json(response.data)
        if (response.data) {
          let result = response.data;
          let output = "Average Rating : " + result.imdbRating +
            "\n Plot : " + result.Plot + "url" + result.Poster
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({
            "fulfillmentText": output
          }));
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({
            "fulfillmentText": "Couldn't find any deatails. :(  "
          }));
        }
      })
      .catch(function (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
          "fulfillmentText": "Error. Can you try it again ? "
        }));
      });
  }
  else if (req.body.queryResult.action == "input.getUserProfile") {
    var welcomeJson = require('../Payload/welcome.json');
    var fullTemplate = require('../Payload/activateFull.json');
    var welComeMsg = renderWelcomeMsg(moment());
    var profileId = req.body.originalDetectIntentRequest.payload.data.sender.id;
    var profileUrl = `https://graph.facebook.com/v2.6/` + profileId + `?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=EAAKQWoK91BcBANCZC6ZCOedAmfk4yyNZAlTgtsjnUx1tSpG9TnjZAcPplR44Ki8Y82VxKagul6F1ZBxsDLyncTgO3iYWTtN1wHSXMBNphwSZCPA71kny9GMSc95iEfYZAv7GcTysDUNcs6O0qA4okX6pqDiFTA8LAi5jJicM0ZBpZCv0ZCGPV9o7pvrIWj5pQPIbkZD`;
    axios.get(profileUrl)
      .then(response => {
        console.log(`Hi ` + response.data.first_name);
        if (profileId != "2029526947151086") { //remove 9
          let output = `Hi ` + welComeMsg + ' ' + response.data.first_name + `, Hope your day is going well. I can quickly help you with following items `;
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({
            "fulfillmentText": "Hello",
            "fulfillmentMessages": [
              {
                "text": {
                  "text": [
                    output
                  ]
                }
              },
              {
                "payload": welcomeJson
              }
            ]
          }));
        }
        else {
          // var scratchCard = require('../Payload/scratchCard.json');
          // var buyNow = require('../Payload/buyNow.json');
          // var findRetailer = require('../Payload/findRetailer.json');
          // var learnMore = require('../Payload/learnMore.json');

          // fullTemplate.facebook.attachment.payload.elements.push(scratchCard);
          // fullTemplate.facebook.attachment.payload.elements.push(buyNow);
          // fullTemplate.facebook.attachment.payload.elements.push(findRetailer);
          // fullTemplate.facebook.attachment.payload.elements.push(learnMore);

          var output = `Hi ` + welComeMsg + ' ' + response.data.first_name + ', I see that you are not a registered member yet. Would you like me to help you become a member?';
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({
            "fulfillmentText": "Hello",
            "fulfillmentMessages": [
              {
                "text": {
                  "text": [
                    output
                  ]
                }
              },
              {
                "payload": fullTemplate
              }
            ]
          }));
        }
      })
      .catch(error => {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
          "fulfillmentText": "Error. Can you try it again ? "
        }));
      });
  }
  else if (req.body.queryResult.action == "input.healthInformation") {
    var messageData = require('../Payload/healthInfo.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      "fulfillmentText": "Hello",
      "fulfillmentMessages": [
        {
          "payload": messageData
        }
      ]
    }));
  }
  else if (req.body.queryResult.action == "input.primaryHealthCare") {
    var messageData = require('../Payload/primaryHealthCare.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      "fulfillmentText": "Hello",
      "fulfillmentMessages": [
        {
          "payload": messageData
        }
      ]
    }));
  }
  else if (req.body.queryResult.action == "input.healthFinancing") {
    var messageData = require('../Payload/healthFinance.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      "fulfillmentText": "Hello",
      "fulfillmentMessages": [
        {
          "payload": messageData
        }
      ]
    }));
  }
  else if (req.body.queryResult.action == "input.manageMembership") {
    var messageData = require('../Payload/manageMembership.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      "fulfillmentText": "Hello",
      "fulfillmentMessages": [
        {
          "payload": messageData
        }
      ]
    }));
  }
  else if (req.body.queryResult.action == "input.remoteConsultation") {
    var messageData = require('../Payload/remoteConsultation.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      "fulfillmentText": "Hello",
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              "Here is the few option you can choose."
            ]
          }
        },
        {
          "payload": messageData
        }
      ]
    }));
  }
  else if (req.body.queryResult.action == "input.insuranceForHealth") {
    var messageData = require('../Payload/insuranceForHealth.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      "fulfillmentText": "Hello",
      "fulfillmentMessages": [
        {
          "payload": messageData
        }
      ]
    }));
  }
  else if (req.body.queryResult.action == "input.getSixteenDigitNumber") {

    var phoneNum = req.body.queryResult.parameters['sixteendigitnumber'];

    if (! /^[0-9]{16}$/.test(phoneNum)) {
      var messageData = require('../Payload/healthCondition.json');
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        "fulfillmentText": "Please enter valid sixteen digit number"
      }));
    }
    else {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        "fulfillmentText": "Great! The scratch card number is valid. I also see that you do not have a profile created yet. Let' start with your mobile number please."
      }));
    }
  }
  else if(req.body.queryResult.action == "input.getPhoneNumber"){
    var messageData = require('../Payload/healthCondition.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      "fulfillmentText": "Great! Please enter your NIC number"
    }));
  }
  else if(req.body.queryResult.action == "input.getNIC"){
    var messageData = require('../Payload/healthCondition.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      "fulfillmentText": "Please enter your date of birth"
    }));
  }
  else if(req.body.queryResult.action == "input.getDOB"){
    // var messageData = require('../Payload/healthCondition.json');
    // res.setHeader('Content-Type', 'application/json');
    // res.send(JSON.stringify({
    //   "fulfillmentText": "niyamay"
    // }));

    var bday = req.body.queryResult.parameters['bday'];
    var profileId = req.body.originalDetectIntentRequest.payload.data.sender.id;
    var profileUrl = `https://graph.facebook.com/v2.6/` + profileId + `?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=EAAKQWoK91BcBANCZC6ZCOedAmfk4yyNZAlTgtsjnUx1tSpG9TnjZAcPplR44Ki8Y82VxKagul6F1ZBxsDLyncTgO3iYWTtN1wHSXMBNphwSZCPA71kny9GMSc95iEfYZAv7GcTysDUNcs6O0qA4okX6pqDiFTA8LAi5jJicM0ZBpZCv0ZCGPV9o7pvrIWj5pQPIbkZD`;
    axios.get(profileUrl)
      .then(response => {
        var config = require('../Payload/profileInfo.json');
        config.facebook.attachment.payload.elements[0].image_url = response.data.profile_pic;
        config.facebook.attachment.payload.elements[0].subtitle = 'Name: ' + response.data.first_name + ' ' + response.data.last_name
          + '\n' + 'Gender: ' + response.data.gender + '\n' + 'Bday: ' + bday;
        let output = `Ok. I have pulled the following info from your facebook account. Please verify before proceeding.`;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
          "fulfillmentText": "Hello",
          "fulfillmentMessages": [
            {
              "text": {
                "text": [
                  output
                ]
              }
            },
            {
              "payload": config
            }
          ]
        }));
      })
      .catch(error => {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
          "fulfillmentText": "Error. Can you try it again ? "
        }));
      });

  }
  else if (req.body.queryResult.action == "input.RegisterStep1") {
    var phoneNum = req.body.queryResult.parameters['phone-number'];
    var profileId = req.body.originalDetectIntentRequest.payload.data.sender.id;
    var profileUrl = `https://graph.facebook.com/v2.6/` + profileId + `?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=EAAKQWoK91BcBANCZC6ZCOedAmfk4yyNZAlTgtsjnUx1tSpG9TnjZAcPplR44Ki8Y82VxKagul6F1ZBxsDLyncTgO3iYWTtN1wHSXMBNphwSZCPA71kny9GMSc95iEfYZAv7GcTysDUNcs6O0qA4okX6pqDiFTA8LAi5jJicM0ZBpZCv0ZCGPV9o7pvrIWj5pQPIbkZD`;
    axios.get(profileUrl)
      .then(response => {
        var config = require('../Payload/profileInfo.json');
        config.facebook.attachment.payload.elements[0].image_url = response.data.profile_pic;
        config.facebook.attachment.payload.elements[0].subtitle = 'Name: ' + response.data.first_name + ' ' + response.data.last_name
          + '\n' + 'Gender: ' + response.data.gender
          + '\n' + 'Phone Number: ' + phoneNum;
        let output = `Ok. I have pulled the following info from your facebook account. Please verify before proceeding.`;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
          "fulfillmentText": "Hello",
          "fulfillmentMessages": [
            {
              "text": {
                "text": [
                  output
                ]
              }
            },
            {
              "payload": config
            }
          ]
        }));
      })
      .catch(error => {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
          "fulfillmentText": "Error. Can you try it again ? "
        }));
      });
  }
  else if (req.body.queryResult.action == "input.healthCondition") {
    var messageData = require('../Payload/healthCondition.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      "fulfillmentText": "Hello",
      "fulfillmentMessages": [
        {
          "payload": messageData
        }
      ]
    }));
  }
});

const renderWelcomeMsg = (m) => {
  var g = null; //return g

  if (!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

  var split_afternoon = 12 //24hr time to split the afternoon
  var split_evening = 17 //24hr time to split the evening
  var currentHour = parseFloat(m.format("HH"));

  if (currentHour >= split_afternoon && currentHour <= split_evening) {
    g = "Good Afternoon";
  } else if (currentHour >= split_evening) {
    g = "Good Evening";
  } else {
    g = "Good Morning";
  }

  return g;
}


module.exports = router;