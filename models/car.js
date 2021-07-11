"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const controller_1 = require("../controllers/controller");
class Car {
    constructor(plate, color, brand) {
        this.wheels = new Array();
        this.plate = plate;
        this.color = color;
        this.brand = brand;
    }
    addWheel(wheel) {
        this.wheels.push(wheel);
    }
    duplicate() {
        let validacion = false;
        for (let i = 0; i < controller_1.cars.length; i++) {
            if (this.plate === controller_1.cars[i].plate) {
                validacion = true;
            }
        }
        return validacion;
    }
    codeDetails(wheelData) {
        let code = `
        <section id="cardCar" class="container m-3 m-auto w-75 p-2 animate__animated animate__backInDown border card shadow">
            <h5 class="font-weight-bold">Car ${this.plate}</h5>
            <div class="row">
                <div class="col-6 col-md-3 d-flex w-100 overflow-auto">
                <span class="font-weight-bold mr-1">Matrícula:</span>
                <span class="text-break">${this.plate}</span>
                </div>
                <div class="col-6 col-md-3 d-flex w-100 overflow-auto">
                <span class="font-weight-bold mr-1">Marca:</span>
                <span class="text-break">${this.brand}</span>
                </div>
                <div class="col-12 col-md-3 d-flex w-100 overflow-auto">
                <span class="font-weight-bold mr-1">Color:</span>
                <span class="text-break">${this.color}</span>
                </div>
            </div>
            <hr>
            <h5 class="font-weight-bold">Rodes</h5>
            <div class="row d-flex justify-content-center">
                ${wheelData}
            </div>
        </section>
        `;
        return code;
    }
}
exports.Car = Car;
//# sourceMappingURL=car.js.map