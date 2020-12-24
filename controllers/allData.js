const Records = require('../db').Records;
const errorHandler = require('../utils/errorHandler');

module.exports.allEntries = (req, res) => {

    Records.all((err, data) => {
        if (err) {
            errorHandler(err, res);
        }
        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
};