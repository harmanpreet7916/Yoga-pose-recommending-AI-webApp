// import express from 'express';
const express = require('express');

const app = express();

const pRoutes = require('./api/routes/ImageRoute')


app.use('/images',pRoutes)
 
module.exports = app;