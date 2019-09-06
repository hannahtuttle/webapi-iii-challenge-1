// code away!
require('dotenv').config()

const express = require('express')

const server = require('./server.js')

const port = process.env.PORT || 8008;

server.listen(port, () => console.log(`\nlistening on port ${port}\n`))