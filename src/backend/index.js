const express = require('express');
const cors = require('cors');
const db = require('./db_config');
const port = 3001

const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/register', (req, res) => {
    res.send(data = {
        placa: req.body.placa,
        nome: req.body.nome,
        marca: req.body.marca,
        modelo: req.body.modelo,
    })

    db.query('INSERT INTO carros(placa,nome,marca,modelo,horario_entrada) VALUES (?,?,?,?,NOW())',
            [ data.placa, data.nome, data.marca, data.modelo], (err) => {
                if (err) throw err;
            });
})

app.get('/api/carros/:placa', (req, res) => {
       
    var placa = req.params.placa
    db.query('SELECT * FROM carros WHERE horario_saida IS NULL AND placa = ?', placa, (err, rows) => {
        if (err) throw error;
        res.send(rows.length ? rows[0] : null)
        
    })
})
    
app.get('/api/saida/:placa', (req, res) => {
    var placa = req.params.placa

    db.query('SELECT * FROM carros WHERE placa = ? AND horario_saida IS NULL', placa , (err, rows) => {
        if (err) throw err
        res.send(rows.length ? rows[0] : null)
    })
})

app.put('/api/saida/valorpago', (req, res) => {
    var data = {
        valor: req.body.valor_pago,
        id: req.body.id
    }
    db.query('UPDATE carros SET valor_pago = ?, horario_saida = NOW() WHERE id = ?', [data.valor, data.id], (err) => {
        if (err) throw err;
    })
})

app.get('/api/saida', (req, res) =>{

    db.query('SELECT * FROM carros WHERE horario_saida IS NULL', (err, rows) => {
        if(err) throw err;
        res.send(rows.length ? rows : null)
    })
})

app.get('/api/relatorio', (req, res) => {
    
    db.query('SELECT * FROM carros WHERE valor_pago IS NOT NULL AND horario_saida IS NOT NULL', (err, rows) => {
        if (err) throw err;
        res.send(rows.length ? rows : null)
    })
})

app.listen(port);