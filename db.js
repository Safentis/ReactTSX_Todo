const sqlite3 = require('sqlite3').verbose();
const dbName = 'todos';
const db = new sqlite3.Database(dbName);

db.serialize(() => {
    const sql = `
        CREATE TABLE IF NOT EXISTS records
        (id integer primary key, content TEXT, checked BOOLEAN)
    `;
    
    db.run(sql);
});

class Records {


    static all(cb) {
        db.all('SELECT * FROM records', cb);
    }


    static checkedData(cb) {
        db.all('SELECT * FROM records WHERE CHECKED = true', cb);
    }


    static create(data, cb) {
        const sql = 'INSERT INTO records(content, checked, id) VALUES (?, ?, ?)';
        const value = [data.content, data.checked, data.id];
        
        db.run(sql, value, cb);
    }


    static delete(id, cb) {
        if (!id) {
            cb(new Error('Please provide an id'));
        }
        else {
            const sql = 'DELETE FROM records WHERE id = ?';
    
            db.run(sql, id, cb);
        }
    }


    static update(id, data, cb) {
        if (!id) {
            cb(new Error('Please provide an id'));
        }
        else {
            const sql = 'UPDATE records SET content=?, checked=? WHERE id=?';
            const value = [data.content, data.checked, id];
    
            db.run(sql, value, cb);
        }
    }
}

module.exports = db;
module.exports.Records = Records;