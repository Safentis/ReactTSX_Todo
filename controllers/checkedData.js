const Records = require('../db').Records;
const errorHandler = require('../utils/errorHandler');

module.exports.checkedData = (req, res) => {

    Records.checkedData((err, data) => {
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