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

router.get('/getMovie', (req, res) => {
  axios.get('http://www.omdbapi.com/?t=joker&apikey=709c821b')
  .then(function (response) {
	console.log(response);
  //res.json(response.data)
  if(response.data) {
    let result = response.data;
    let output = "Average Rating : " + result.imdbRating + 
    "\n Plot : " + result.Plot + "url" + result.Poster
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
            "speech" : output,
            "displayText" : output
        }));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
            "speech" : "Couldn't find any deatails. :(  ",
            "displayText" : "Couldn't find any deatails. :(  "
        }));
    }
  })
  .catch(function (error) {
    console.log(error);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
                        "speech" : "Error. Can you try it again ? ",
                        "displayText" : "Error. Can you try it again ? "
                    }));
  });
});

module.exports = router;