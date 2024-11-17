require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');
const RectanguloModel = require('./models/Rectangulo');
const CirculoModel = require('./models/Circulo');
const TrianguloModel = require('./models/Triangulo');

const app = express();
const port = 3000;

const sequelize = new Sequelize(process.env.DB_NOMBRE, process.env.DB_USUARIO, process.env.DB_CONTRASENA, {
    host: process.env.DB_HOST,
    port: process.env.DB_PUERTO,
    dialect: 'postgres'
});

const Rectangulo = RectanguloModel(sequelize);
const Circulo = CirculoModel(sequelize);
const Triangulo = TrianguloModel(sequelize);

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos:', err);
    });

app.use(express.json());

app.get('/', (req, res) => {
    res.send('App');
});

app.get('/rectangulo/:id', async (req, res) => {
    try {
        const rectangulo = await Rectangulo.findByPk(req.params.id);
        if (rectangulo) {
            res.json({
                rectangulo: rectangulo.toJSON(),
                area: rectangulo.calcularArea(),
                perimetro: rectangulo.calcularPerimetro()
            });
        } else {
            res.status(404).send('Rectángulo no encontrado');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/circulos', async (req, res) => {
    try {
        const circulos = await Circulo.findAll();
        const resultados = circulos.map(circulo => ({
            id: circulo.id,
            radio: circulo.radio,
            area: circulo.calcularArea(),
            perimetro: circulo.calcularPerimetro()
        }));
        res.json(resultados);
    } catch (error) {
        console.error('Error al obtener los círculos:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
});

app.get('/triangulos', async (req, res) => {
    try {
        const triangulos = await Triangulo.findAll();
        const resultados = triangulos.map(triangulo => ({
            id: triangulo.id,
            lados: [triangulo.lado1, triangulo.lado2, triangulo.lado3],
            area: triangulo.calcularArea(),
            perimetro: triangulo.calcularPerimetro()
        }));
        res.json(resultados);
    } catch (error) {
        console.error('Error al obtener los triángulos:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
