const db = require('../connection');

// Shared query for joined item data
const itemJoinQuery = `
    SELECT items.ITEM_ID, items.TITLE, items.CATEGORY_ID, items.DESCRIPTION, items.PRICE, items.SKU,
           categories.CATEGORY AS CATEGORY_NAME
    FROM items
    LEFT JOIN categories ON items.CATEGORY_ID = categories.CATEGORY_ID
`;

module.exports = {
    // GET /items
    index(req, res) {
        db.query(itemJoinQuery, (err, itemResults) => {
            if (err) {
                console.error("Select items error:", err);
                return res.sendStatus(500);
            }

            return res.send({ items: itemResults });
        });
    },

    // POST /items (Store)
    store(req, res) {
        console.log("Received POST /items");
        console.log("Body:", req.body);

        const item = req.body.TITLE;
        const categoryId = req.body.CATEGORY_ID;
        const description = req.body.DESCRIPTION || '';
        const price = req.body.PRICE || 0;
        const sku = req.body.SKU || '';

        const query = `
            INSERT INTO items (TITLE, CATEGORY_ID, DESCRIPTION, PRICE, SKU) 
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(query, [item, categoryId, description, price, sku], (err, result) => {
            if (err) {
                console.error("Insert Error:", err);
                return res.sendStatus(500);
            }

            console.log("Insert Success:", result);

            db.query(itemJoinQuery, (err, itemResults) => {
                if (err) {
                    console.error("Select items error after insert:", err);
                    return res.sendStatus(500);
                }

                db.query('SELECT * FROM categories', (err, categoryResults) => {
                    if (err) {
                        console.error("Select categories error:", err);
                        return res.sendStatus(500);
                    }

                    return res.send({
                        items: itemResults,
                        categories: categoryResults
                    });
                });
            });
        });
    },

    // PATCH /items/:id (Update)
    update(req, res) {
        console.log("Received PATCH /items");
        console.log("Body:", req.body);
        console.log("Params:", req.params);

        const itemId = req.params.id;
        const title = req.body.TITLE;
        const categoryId = req.body.CATEGORY_ID;
        const description = req.body.DESCRIPTION || '';
        const price = req.body.PRICE || 0;
        const sku = req.body.SKU || '';

        const query = `
            UPDATE items 
            SET TITLE=?, CATEGORY_ID=?, DESCRIPTION=?, PRICE=?, SKU=? 
            WHERE ITEM_ID=?
        `;

        db.query(query, [title, categoryId, description, price, sku, itemId], (err, result) => {
            if (err) {
                console.error("Update error:", err);
                return res.sendStatus(500);
            }

            db.query(itemJoinQuery, (err, itemResults) => {
                if (err) return res.sendStatus(500);
                return res.send({ items: itemResults });
            });
        });
    },

    // DELETE /items/:id (Destroy)
    destroy(req, res) {
        const id = req.params.id;

        db.query('DELETE FROM items WHERE ITEM_ID=?', [id], (err, result) => {
            if (err) {
                console.error("Delete error:", err);
                return res.sendStatus(500);
            }

            db.query(itemJoinQuery, (err, itemResults) => {
                if (err) return res.sendStatus(500);

                return res.send({ items: itemResults });
            });
        });
    }
};
