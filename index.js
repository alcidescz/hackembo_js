const { v4: uuidv4 } = require('uuid');
const {response} = require('express');
const express = require('express');
const app = express();
const path = require("path"); 

app.use(express.static('public'));
app.use(express.json({ limit : '1mb'}));
app.set('view engine', 'html')

app.get('/mapa', (req, res) =>
{
res.render('mapa.html')
});

app.post('/api', (request, response) => {
  console.log('Tengo una nueva consulta')
  console.log(request.body);
  const data = request.body;
  response.json({ 
    status: data.user_id,
    latitude: data.lat,
    longitude: data.lon,

  });
}); 

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});