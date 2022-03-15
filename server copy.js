const {Client} = require("@googlemaps/google-maps-services-js");
const express = require('express');
const app = express();
const path = require("path"); 

const client = new Client({});


app.set("views",path.join(__dirname, "views"));
app.use(express.static(__dirname + '/view/css'));


app.set("view engine", "ejs");


app.get('/', (req, res) => {
  res
    .render("index")
});

app.get('/hola', (req, res) => {
  res
    .render("map");
});

app.get('/esperando',(req, res) => {
  res
    .render("esperando");
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});