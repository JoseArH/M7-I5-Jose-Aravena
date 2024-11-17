// models/Rectangulo.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Rectangulo = sequelize.define('Rectangulo', {
        base: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        altura: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    Rectangulo.prototype.calcularArea = function () {
        return this.base * this.altura;
    };

    Rectangulo.prototype.calcularPerimetro = function () {
        return 2 * (this.base + this.altura);
    };

    return Rectangulo;
};

