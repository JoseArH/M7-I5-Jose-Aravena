// models/Triangulo.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Triangulo = sequelize.define('Triangulo', {
        lado1: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        lado2: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        lado3: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    Triangulo.prototype.calcularArea = function () {
        // Fórmula de Herón
        const s = (this.lado1 + this.lado2 + this.lado3) / 2;
        return Math.sqrt(s * (s - this.lado1) * (s - this.lado2) * (s - this.lado3));
    };

    Triangulo.prototype.calcularPerimetro = function () {
        return this.lado1 + this.lado2 + this.lado3;
    };

    return Triangulo;
};
