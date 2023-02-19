const express = require('express');
const router = express.Router();

    router

.get('/', async (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM people', (err, people) => {
            if(err) console.log(err);

            console.log(people);
            res.render('index', {
                people
            })
        })
    })
})

.post('/add', (req, res) => {
    const {name, age, job} = req.body;

    req.getConnection((err, conn) => {
        conn.query(`
        INSERT INTO people (name, age, job)
        VALUES ('${name}', '${age}', '${job}')
        `, (err, person) => {
            if(err) console.log(err);

            console.log(person);
            res.redirect('/');
        })
    })
})

.delete('/delete/:id', (req, res) => {
    req.getConnection((err, conn) => {
        conn.query(`DELETE FROM people WHERE id = '${req.params.id}'`, (err, result) => {
            if(err) console.log(err)

            console.log(result);
            res.redirect('/');
        })
    })
})

.get('/person/:id', (req, res) => {
    req.getConnection( (err, conn) => {
        conn.query(`SELECT * FROM people WHERE id = '${req.params.id}'`, (err, info) => {
            if(err) console.log(err);

            console.log(info);
            res.render('person', {
                info
            })
        })
    })
})

.put('/update/:id', (req, res) => {

    const {name, age, job} = req.body;

    req.getConnection( (err, conn) => {
        conn.query(`
            UPDATE people SET 
            name = '${name}',
            age = '${age}',
            job = '${job}'
            WHERE id = '${req.params.id}'
        `, (err, result) => {
            if(err) console.log(err);

            console.log(result);
            res.redirect('/')
        })
    })
})

module.exports = router;