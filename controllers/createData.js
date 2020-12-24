const Records = require('../db').Records;
const errorHandler = require('../utils/errorHandler');

module.exports.createData = (req, res) => {
    const data = req.body;

    Records.create(data, (err) => {
        if (err) {
            errorHandler(err, res);
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data, null, 2));
        }
    });
}