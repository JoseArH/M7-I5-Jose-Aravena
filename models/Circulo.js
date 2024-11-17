const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Circulo = sequelize.define('Circulo', {
        radio: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    Circulo.prototype.calcularArea = function () {
        return Math.PI * this.radio * this.radio;
    };

    Circulo.prototype.calcularPerimetro = function () {
        return 2 * Math.PI * this.radio;
    };

    return Circulo;
};
