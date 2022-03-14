const express = require('express');
const bodyParser = require('body-parser');
const koneksi = require('./config/database');
const app = express();
const PORT = process.env.PORT || 5000;
// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// create data / insert data
app.post('/recipe-categories', (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const querySql = 'INSERT INTO RecipeCategory SET ? , createdAt = current_timestamp(), updatedAt=current_timestamp()';

    // jalankan query
    koneksi.query(querySql, data, (err, rows, field) => {

        const querySqlGet = 'SELECT name,id,createdAt,updatedAt FROM RecipeCategory order by id desc limit 1';
        koneksi.query(querySqlGet, (err, rowsGet, field) => {
            // error handling
            if (err) {
                return res.status(500).json({ message: 'Ada kesalahan', error: err });
            }
    
            // jika request berhasil
            res.status(200).json({ success: true, message: 'Success', data: rowsGet });
        });


    });
});

// read data / get data
app.get('/recipe-categories', (req, res) => {
    // buat query sql
    const querySql = 'SELECT * FROM RecipeCategory';

    // jalankan query
    koneksi.query(querySql, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        // jika request berhasil
        res.status(200).json({ success: true, message: 'Success', data: rows });
    });
});

// update data
app.put('/recipe-categories/:id', (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const querySearch = 'SELECT * FROM RecipeCategory WHERE id = ?';
    const queryUpdate = 'UPDATE RecipeCategory SET ? WHERE id = ?';

    // jalankan query untuk melakukan pencarian data
    koneksi.query(querySearch, req.params.id, (err, rows, field) => {

        // error handling
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        // jika id yang dimasukkan sesuai dengan data yang ada di db
        if (rows.length) {
            // jalankan query update
            koneksi.query(queryUpdate, [data, req.params.id], (err, rows, field) => {

            const querySqlGet = 'SELECT id,name,createdAt,updatedAt FROM RecipeCategory where id =' + req.params.id;
            koneksi.query(querySqlGet, (err, rowsGet, field) => {
            // error handling
            if (err) {
                return res.status(500).json({ message: 'Ada kesalahan', error: err });
            }
            // jika request berhasil
            res.status(200).json({ success: true, message: 'Success', data: rowsGet });
             });

            });
        } else {
            return res.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    });
});

// delete data
app.delete('/recipe-categories/:id', (req, res) => {
    // buat query sql untuk mencari data dan hapus
    const data = { ...req.body };
    const querySearch = 'SELECT * FROM RecipeCategory WHERE id = ?';
    const queryDelete = 'DELETE FROM RecipeCategory WHERE id = ?';

    // jalankan query untuk melakukan pencarian data
    koneksi.query(querySearch, [data, req.params.id], (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        // jika id yang dimasukkan sesuai dengan data yang ada di db
        if (rows.length) {
            // jalankan query delete
            koneksi.query(queryDelete, req.params.id, (err, rows, field) => {
                // error handling
                if (err) {
                    return res.status(500).json({ message: 'Ada kesalahan', error: err });
                }

                // jika delete berhasil
                res.status(200).json({ success: true, message: 'Success', data : {} });
            });
        } else {
            return res.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    });
});





// create data / insert data
// read data / get data
app.get('/recipes', (req, res) => {
    // buat query sql
    const Cat = '';
    const querySql = 'SELECT * FROM Recipes';

    // jalankan query
    koneksi.query(querySql, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        for (var i = 0; i < rows.length; i++) {
            const queryCat = 'select * from RecipeCategory where id =' + rows[i].recipeCategoryId;
            koneksi.query(queryCat, (err, rowsCat, field) =>{
            for (obj of rows[i]) {
               rows[i].recipe_category = rowsCat
            }
        });
        }

        // jika request berhasil
        res.status(200).json({ success: true, message: 'Success', data: rows });
    });
});







// buat server nya
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));