const Records = require('../db').Records;
const errorHandler = require('../utils/errorHandler');

module.exports.updateData = (req, res) => {
    const data = req.body;
    const id = req.params.id;

    Records.update(id, data, (err) => {
        if (err) {
            errorHandler(err, res);
        }
        else {
            console.log(data);
            console.log(id);
            res.end(`patch data ${id}`);
        }
    })

}