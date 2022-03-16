const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.set("view engine", "html");

app.get("/mapa", (req, res) => {
  res.render("mapa.html");
});

app.post("/api", (request, response) => {
  console.log("Tengo una nueva consulta");
  console.log(request.body);
  const data = request.body;
  response.json({
    status: data.user_id,
    latitude: data.lat,
    longitude: data.lon,
  });
});

let DB = [{}];

app.post("/nueva", (req, res) => {
  let uuid = Math.random().toString();
  DB.push({ id: uuid, lat: req.body.lat, lon: req.body.lon });
  res.send({ uuid, lat: req.body.lat, lon: req.body.lon });
});

app.put("/update-location/:id", (req, res) => {
  const { lat, lon } = req.body;
  const { id } = req.params;
  //console.log(req.body);
  //console.log(lat);

  const index = DB.findIndex((location) => {
    return id === location.id;
  });
  console.log(index);
  //if (index == -1) {
  currentLocation = { lat: lat, lon: lon };
  DB[0] = currentLocation;
  console.log(DB);
  //}

  res.send({
    locations: DB,
  });
});

app.get("/locations", (req, res) => {
  res.send({
    locations: DB,
  });
});

// function mapping(key, index) {
//   console.log("KEY", key);
//   console.log("VALUE", DB[key]);
//   return { lat: DB[key].lat, lon: DB[key].lon, id: key };
// }

//const listOfLocations = Object.keys(DB).map(mapping);

//res.send(listOfLocations);
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
