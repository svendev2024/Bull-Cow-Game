const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

// Api for connecting to mongo
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST folder
app.use(express.static(path.join(__dirname, 'dist')));

// Api location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app)

server.listen(port, () => console.log('Magic happens on localhost:' + port));