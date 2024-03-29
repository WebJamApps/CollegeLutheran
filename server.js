/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const path = require('path');
const express = require('express');
const enforce = require('express-sslify');

const app = express();
let port = Number(process.env.PORT);
if (process.env.PUPPET_PORT) port = Number(process.env.PUPPET_PORT);

if (process.env.NODE_ENV === 'production') app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use(express.static(path.normalize(path.join(__dirname, 'dist'))));
app.use('/', express.static(path.normalize(path.join(__dirname, 'dist'))));
app.get('/*', (request, response) => {
  response.sendFile(path.normalize(path.join(__dirname, 'dist/index.html')));
});
app.listen(port, () => {
  console.log(`Magic happens on port ${port}`); // eslint-disable-line no-console
});

module.exports = app;
