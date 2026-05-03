'use strict';
/* import dependencies */
const express = require('express');
const jsDOM = require('jsdom');
const cookieParser = require('cookie-parser');
const globalObject = require('./servermodules/game-modul.js');
const fs = require('fs');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use('/public/', express.static(__dirname + '/static'));
app.use(cookieParser());

app.post('/', (req, res) => {});

app.get('/', (req, res) => {
  try {
    res.sendFile(__dirname + '/static/html/index.html', (err) => {
      if (err) throw new Error('Cant open index.html');
    });
  } catch (err) {
    console.error(err);
  }
});

app.get('/reset', (req, res) => {});

app.listen(3000, () => console.log('Server is running on port 3000'));

//Filen app.js är den enda ni skall och tillåts skriva kod i.
