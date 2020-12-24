const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const getEntriesRoute = require('./routes/allData');
const createEntrieRoute = require('./routes/createData');
const deleteEntrieRoute = require('./routes/deleteData');
const updateEntrieRoute = require('./routes/updateData');
const checkedEntrieRoute = require('./routes/checkedData');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', getEntriesRoute);
app.use('/api', createEntrieRoute);
app.use('/api', deleteEntrieRoute);
app.use('/api', updateEntrieRoute);
app.use('/api', checkedEntrieRoute);

module.exports = app;