// Establish Connection to Database
const db = require("../connection");

module.exports = {
    // CREATE
    store(req, res) {
        const category = req.body.category;
        db.query(`INSERT INTO categories (CATEGORY) VALUES (?)`, [category], (err, result) => {
            if (err) return res.sendStatus(500);
            
            db.query(`SELECT * FROM categories`, (err, results) => {
                if (err) return res.sendStatus(500);
                return res.send({ categories: results });
            });
        });
    },

    // READ
    index(req, res) {
        db.query(`SELECT * FROM categories`, (err, results) => {
            if (err) return res.sendStatus(500);
            return res.send({ categories: results });
        });
    },

    // UPDATE
    update(req, res) {
        const category = req.body.category;
        const id = req.params.id;
    
        console.log("PATCH /categories/:id");
        console.log("Incoming ID:", id);
        console.log("Incoming category name:", category);
        console.log("req.params:", req.params);
        console.log("req.body:", req.body);
    
        db.query(`UPDATE categories SET CATEGORY=? WHERE CATEGORY_ID=?`, [category, id], (err, result) => {
            if (err) {
                console.error("Update query error:", err);
                return res.sendStatus(500);
            }
    
            console.log("Rows affected by update:", result.affectedRows);
    
            db.query(`SELECT * FROM categories`, (err, results) => {
                if (err) return res.sendStatus(500);
                return res.send({ categories: results });
            });
        });
    },
    
    // DELETE
    destroy(req, res) {
        const id = req.params.id;

        db.query(`DELETE FROM categories WHERE CATEGORY_ID=?`, [id], (err, result) => {
            if (err) return res.sendStatus(500);
            
            db.query(`SELECT * FROM categories`, (err, results) => {
                if (err) return res.sendStatus(500);
                return res.send({ categories: results });
            });
        });
    }
};
