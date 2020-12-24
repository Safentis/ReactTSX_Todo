const Records = require('../db').Records;
const errorHandler = require('../utils/errorHandler');

module.exports.deleteData = (req, res) => {
    const id = req.params.id;
    
    Records.delete(id, (err) => {
        if (err) {
            errorHandler(err, res);
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(id, null, 2));
        }
    });
}