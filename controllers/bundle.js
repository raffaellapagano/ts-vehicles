(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};

},{}],2:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
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

},{"./../models/car":4,"./../models/textError":5,"./../models/wheel":6,"uniqid":7}],4:[function(require,module,exports){
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

},{"../controllers/controller":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextMsn = void 0;
class TextMsn {
    constructor() {
        this.required = "Values Required";
        this.plate = "Error en format of Plate. Ex. 1234ABC";
        this.wheelDiameter = "The value of diameter is between 0,4 and 2";
        this.duplicate = "This car is already registrered";
    }
}
exports.TextMsn = TextMsn;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wheel = void 0;
class Wheel {
    constructor(diameter, brand) {
        this.diameter = diameter;
        this.brand = brand;
    }
    codeDetails(numero) {
        let code = `
            <div class=" wheelDetail border border-primary rounded-circle m-2">
                <div class="d-flex flex-column p-1">
                <h6 class="font-weight-bold text-center">Wheel ${numero}</h6>
                <div class="d-flex justify-content-center">
                    Brand: ${this.brand}
                </div>
                <div class="d-flex justify-content-center">
                    Diameter: ${this.diameter}
                </div>
            </div>
        </div>
        `;
        return code;
    }
    validateWheel() {
        if ((this.diameter >= 0.4) && (this.diameter <= 2)) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.Wheel = Wheel;

},{}],7:[function(require,module,exports){
(function (process){(function (){
/* 
(The MIT License)
Copyright (c) 2014-2021 Halász Ádám <adam@aimform.com>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//  Unique Hexatridecimal ID Generator
// ================================================

//  Dependencies
// ================================================
var pid = typeof process !== 'undefined' && process.pid ? process.pid.toString(36) : '' ;
var address = '';
if(typeof __webpack_require__ !== 'function'){
    var mac = '', networkInterfaces = require('os').networkInterfaces();
    loop:
    for(let interface_key in networkInterfaces){
        const networkInterface = networkInterfaces[interface_key];
        const length = networkInterface.length;
        for(var i = 0; i < length; i++){
            if(networkInterface[i] !== undefined && networkInterface[i].mac && networkInterface[i].mac != '00:00:00:00:00:00'){
                mac = networkInterface[i].mac; break loop;
            }
        }
    }
    address = mac ? parseInt(mac.replace(/\:|\D+/gi, '')).toString(36) : '' ;
} 

//  Exports
// ================================================
module.exports = module.exports.default = function(prefix, suffix){ return (prefix ? prefix : '') + address + pid + now().toString(36) + (suffix ? suffix : ''); }
module.exports.process = function(prefix, suffix){ return (prefix ? prefix : '') + pid + now().toString(36) + (suffix ? suffix : ''); }
module.exports.time    = function(prefix, suffix){ return (prefix ? prefix : '') + now().toString(36) + (suffix ? suffix : ''); }

//  Helpers
// ================================================
function now(){
    var time = Date.now();
    var last = now.last || time;
    return now.last = time > last ? time : last + 1;
}

}).call(this)}).call(this,require('_process'))
},{"_process":2,"os":1}]},{},[3]);
