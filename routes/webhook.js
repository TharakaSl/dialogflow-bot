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
	res.json(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
});

module.exports = router;