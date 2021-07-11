"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cars = void 0;
const wheel_1 = require("./../models/wheel");
const car_1 = require("./../models/car");
const textError_1 = require("./../models/textError");
const uniqid = require('uniqid');
let car;
let cars = new Array();
exports.cars = cars;
let sectionCar = document.getElementById("sectionCar");
let sectionWheels = document.getElementById("sectionWheels");
let sectionCarsCreate = document.getElementById("sectionCarsCreate");
let validacion = false;
let textMsn = new textError_1.TextMsn();
window.addEventListener('load', (event) => {
    var _a, _b, _c;
    (_a = document.getElementById("carForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", createCar);
    (_b = document.getElementById("wheelsForm")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", createWheels);
    (_c = document.getElementById("btBack")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", backCarForm);
});
function createCar(e) {
    e.preventDefault();
    let plate = document.getElementById("plate");
    plate.value = plate.value.toUpperCase();
    let brand = document.getElementById("brand");
    brand.value = brand.value.toUpperCase();
    let color = document.getElementById("color");
    color.value = color.value.toUpperCase();
    car = new car_1.Car(plate.value, color.value, brand.value);
    let error = 0;
    // Errores
    let errplate = document.getElementById("errplate");
    let errbrand = document.getElementById("errbrand");
    let errcolor = document.getElementById("errcolor");
    //Reset values
    plate.classList.remove("is-invalid");
    brand.classList.remove("is-invalid");
    color.classList.remove("is-invalid");
    errplate.innerHTML = "";
    errbrand.innerHTML = "";
    errcolor.innerHTML = "";
    if (!validar_plate(plate.value)) {
        errplate.innerHTML = textMsn.plate;
        plate.classList.add("is-invalid");
        error++;
    }
    if (!validar_value(plate.value)) {
        errplate.innerHTML = textMsn.required;
        plate.classList.add("is-invalid");
        error++;
    }
    if (!validar_value(brand.value)) {
        errbrand.innerHTML = textMsn.required;
        brand.classList.add("is-invalid");
        error++;
    }
    if (!validar_value(color.value)) {
        errcolor.innerHTML = textMsn.required;
        color.classList.add("is-invalid");
        error++;
    }
    if (car.duplicate()) {
        error++;
        alert(textMsn.duplicate);
    }
    if (error === 0) {
        cars.push(car);
        alert(`The ${car.color} car ${car.brand} with plate ${car.plate} has been created`);
        sectionCar.classList.add('d-none');
        sectionWheels.classList.remove('d-none');
    }
}
function createWheels(e) {
    e.preventDefault();
    let brandWheel1 = document.getElementById("brandWheel1");
    let diameter1 = document.getElementById("diameter1");
    let brandWheel2 = document.getElementById("brandWheel2");
    let diameter2 = document.getElementById("diameter2");
    let brandWheel3 = document.getElementById("brandWheel3");
    let diameter3 = document.getElementById("diameter3");
    let brandWheel4 = document.getElementById("brandWheel4");
    let diameter4 = document.getElementById("diameter4");
    let wheelsArray = new Array();
    let error = 0;
    // Errors in inputs
    let errdiameter1 = document.getElementById("errdiameter1");
    let errdiameter2 = document.getElementById("errdiameter2");
    let errdiameter3 = document.getElementById("errdiameter3");
    let errdiameter4 = document.getElementById("errdiameter4");
    let errBrandWheel1 = document.getElementById("errBrandWheel1");
    let errBrandWheel2 = document.getElementById("errBrandWheel2");
    let errBrandWheel3 = document.getElementById("errBrandWheel3");
    let errBrandWheel4 = document.getElementById("errBrandWheel4");
    //Reset values
    errdiameter1.innerHTML = "";
    errdiameter2.innerHTML = "";
    errdiameter3.innerHTML = "";
    errdiameter4.innerHTML = "";
    errBrandWheel1.innerHTML = "";
    errBrandWheel2.innerHTML = "";
    errBrandWheel3.innerHTML = "";
    errBrandWheel4.innerHTML = "";
    wheelsArray.push(new wheel_1.Wheel(parseFloat(diameter1.value), brandWheel1.value));
    wheelsArray.push(new wheel_1.Wheel(parseFloat(diameter2.value), brandWheel2.value));
    wheelsArray.push(new wheel_1.Wheel(parseFloat(diameter3.value), brandWheel3.value));
    wheelsArray.push(new wheel_1.Wheel(parseFloat(diameter4.value), brandWheel4.value));
    //Validate values
    if (!validar_value(brandWheel1.value)) {
        errBrandWheel1.innerHTML = textMsn.required;
        brandWheel1.classList.add("is-invalid");
        error++;
    }
    else {
        brandWheel1.classList.remove("is-invalid");
    }
    if (!validar_value(brandWheel2.value)) {
        errBrandWheel2.innerHTML = textMsn.required;
        brandWheel2.classList.add("is-invalid");
        error++;
    }
    else {
        brandWheel2.classList.remove("is-invalid");
    }
    if (!validar_value(brandWheel3.value)) {
        errBrandWheel3.innerHTML = textMsn.required;
        brandWheel3.classList.add("is-invalid");
        error++;
    }
    else {
        brandWheel3.classList.remove("is-invalid");
    }
    if (!validar_value(brandWheel4.value)) {
        errBrandWheel4.innerHTML = textMsn.required;
        brandWheel4.classList.add("is-invalid");
        error++;
    }
    else {
        brandWheel4.classList.remove("is-invalid");
    }
    if (!wheelsArray[0].validateWheel()) {
        errdiameter1.innerHTML = textMsn.wheelDiameter;
        diameter1.classList.add("is-invalid");
        error++;
    }
    else {
        diameter1.classList.remove("is-invalid");
    }
    if (!wheelsArray[1].validateWheel()) {
        errdiameter2.innerHTML = textMsn.wheelDiameter;
        diameter2.classList.add("is-invalid");
        error++;
    }
    else {
        diameter2.classList.remove("is-invalid");
    }
    if (!wheelsArray[2].validateWheel()) {
        errdiameter3.innerHTML = textMsn.wheelDiameter;
        diameter3.classList.add("is-invalid");
        error++;
    }
    else {
        diameter3.classList.remove("is-invalid");
    }
    if (!wheelsArray[3].validateWheel()) {
        errdiameter4.innerHTML = textMsn.wheelDiameter;
        diameter4.classList.add("is-invalid");
        error++;
    }
    else {
        diameter4.classList.remove("is-invalid");
    }
    if (error === 0) {
        for (let i = 0; i < wheelsArray.length; i++) {
            car.addWheel(wheelsArray[i]);
        }
        sectionWheels.classList.add('d-none');
        sectionCar.classList.remove('d-none');
        buildCar();
    }
}
function buildCar() {
    let showCar = document.getElementById("sectionCarsCreate");
    let newCar = cars[cars.length - 1];
    let arrayWheels = car.wheels;
    let arrayText = "";
    let text = "";
    for (let i = 0; i < arrayWheels.length; i++) {
        arrayText = arrayText + arrayWheels[i].codeDetails(i + 1);
    }
    text = text + newCar.codeDetails(arrayText);
    sectionCar.classList.remove('d-none');
    showCar.insertAdjacentHTML("beforeend", text);
}
function validar_plate(plate) {
    var regex = /^[0-9]{4}[A-Z,a-z]{3}$/;
    return regex.test(plate) ? true : false;
}
function validar_value(value) {
    if (value === '') {
        return false;
    }
    else {
        return true;
    }
}
function backCarForm() {
    cars.pop();
    sectionWheels.classList.add('d-none');
    sectionCar.classList.remove('d-none');
    restarWheelForm();
}
function restarWheelForm() {
    let brandWheel1 = document.getElementById("brandWheel1");
    let diameter1 = document.getElementById("diameter1");
    let brandWheel2 = document.getElementById("brandWheel2");
    let diameter2 = document.getElementById("diameter2");
    let brandWheel3 = document.getElementById("brandWheel3");
    let diameter3 = document.getElementById("diameter3");
    let brandWheel4 = document.getElementById("brandWheel4");
    let diameter4 = document.getElementById("diameter4");
    document.getElementById("brandWheel1").value = "";
    document.getElementById("diameter1").value = "";
    document.getElementById("brandWheel2").value = "";
    document.getElementById("diameter2").value = "";
    document.getElementById("brandWheel3").value = "";
    document.getElementById("diameter3").value = "";
    document.getElementById("brandWheel4").value = "";
    document.getElementById("diameter4").value = "";
    brandWheel1.classList.remove("is-invalid");
    brandWheel2.classList.remove("is-invalid");
    brandWheel3.classList.remove("is-invalid");
    brandWheel4.classList.remove("is-invalid");
    diameter1.classList.remove("is-invalid");
    diameter2.classList.remove("is-invalid");
    diameter3.classList.remove("is-invalid");
    diameter4.classList.remove("is-invalid");
}
//# sourceMappingURL=controller.js.map