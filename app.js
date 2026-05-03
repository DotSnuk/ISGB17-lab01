'use strict';
/* import dependencies */
const express = require('express');
const jsDOM = require('jsdom');
const cookieParser = require('cookie-parser');
const globalObject = require('./servermodules/game-modul.js');
const fs = require('fs');

const app = express();
/* middlewares */
app.use(express.urlencoded({ extended: true }));
app.use('/public/', express.static(__dirname + '/static'));
app.use(cookieParser());

function validateForm(req, res, next) {
  try {
    if (req.body === undefined) throw new Error('No data sent');
    const name = req.body.nick_1;
    console.log(req.body);
    const color = req.body.color_1;
    if (name === undefined) throw new Error('Nickname saknas!');
    if (color === undefined) throw new Error('Färg saknas!');
    if (name.trim().length < 3)
      throw new Error('Nickname ska vara minst tre tecken långt!');
    if (color.trim().length !== 7)
      throw new Error('Färg ska innehålla sju tecken!');
    if (color.trim() === '#FFFFFF' || color.trim() === '#000000')
      throw new Error('Ogiltig färg!');
    next();
  } catch (err) {
    console.error(err);
  }
}

function comparePlayers(req, res, next) {
  /* compare players */
  next();
}

function createCookie(req, res, next) {
  res.cookie('nickName', req.body.name_1, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 2,
  });
  res.cookie('color', req.body.color_1, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 2,
  });

  res.redirect('/');
}

/* endpoints */
app.post('/', validateForm, comparePlayers, createCookie);

app.get('/', (req, res) => {
  if (req.cookies.color && req.cookies.nickName)
    res.sendFile(__dirname + '/static/html/index.html');
  else res.sendFile(__dirname + '/static/html/loggain.html');
  /*
  try {
    res.sendFile(__dirname + '/static/html/index.html', (err) => {
      if (err) throw new Error('Cant open index.html');
    });
  } catch (err) {
    console.error(err);
  }
  */
});

app.get('/reset', (req, res) => {});

app.listen(3000, () => console.log('Server is running on port 3000'));

//Filen app.js är den enda ni skall och tillåts skriva kod i.
