const express = require('express');
const bodyparser = require('body-parser');
const axios = require("axios");
// Configuration
const app = express();
app.use(bodyparser.json());
var router = express.Router();

// Webhook route
router.post('/', (req, res) => {  
    const url = "https://my-json-server.typicode.com/edurekaDemo/noderequest/db";
    const getData = async url => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      console.log(data);
      res.json(data)
    } catch (error) {
      console.log(error);
    }
};
getData(url);  
});

router.post('/getMovie', (req, res) => {
  if(req.body.queryResult.action == "input.getMovieInfo"){
    var movieName = req.body.queryResult.parameters['movie_name'];
  axios.get('http://www.omdbapi.com/?t='+movieName+'&apikey=709c821b')
  .then(function (response) {
	console.log(response);
  //res.json(response.data)
  if(response.data) {
    let result = response.data;
    let output = "Average Rating : " + result.imdbRating + 
    "\n Plot : " + result.Plot + "url" + result.Poster
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
          "fulfillmentText" : output
        }));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        "fulfillmentText" : "Couldn't find any deatails. :(  "
        }));
    }
  })
  .catch(function (error) {
    console.log(error);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      "fulfillmentText" : "Error. Can you try it again ? "
                    }));
  });
}
else if(req.body.queryResult.action == "input.getUserProfile"){

  var config = require('../Payload/welcome.json');

  var profileId = req.body.originalDetectIntentRequest.payload.data.sender.id;
  var profileUrl = `https://graph.facebook.com/v2.6/`+profileId+`?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=EAAKQWoK91BcBANCZC6ZCOedAmfk4yyNZAlTgtsjnUx1tSpG9TnjZAcPplR44Ki8Y82VxKagul6F1ZBxsDLyncTgO3iYWTtN1wHSXMBNphwSZCPA71kny9GMSc95iEfYZAv7GcTysDUNcs6O0qA4okX6pqDiFTA8LAi5jJicM0ZBpZCv0ZCGPV9o7pvrIWj5pQPIbkZD`;   
  axios.get(profileUrl)
   .then(response => {
     console.log(`Hi ` +response.data.first_name);
     let output = `Hi `+response.data.first_name;
     res.setHeader('Content-Type', 'application/json');
     res.send(JSON.stringify({
          "fulfillmentText" : output,
          "fulfillmentMessages": [
            {
              "card": {
                "title": "card title",
                "subtitle": "card text",
                "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
                "buttons": [
                  {
                    "text": "button text",
                    "postback": "https://assistant.google.com/"
                  }
                ]
              }
            }
          ]
        }));
   })
   .catch(error => {
    console.log(error);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      "fulfillmentText" : "Error. Can you try it again ? "
                    }));
   });
}
});

module.exports = router;