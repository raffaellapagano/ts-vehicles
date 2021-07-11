import { Wheel } from "./../models/wheel";
import { Car } from "./../models/car";
import { TextMsn } from "./../models/textError";

const uniqid = require('uniqid');

let car: Car;
let cars: Car[] = new Array();
let sectionCar: HTMLInputElement = <HTMLInputElement>document.getElementById("sectionCar");
let sectionWheels: HTMLInputElement = <HTMLInputElement>document.getElementById("sectionWheels");
let sectionCarsCreate: HTMLInputElement = <HTMLInputElement>document.getElementById("sectionCarsCreate");
let validacion: boolean = false;
let textMsn = new TextMsn();

window.addEventListener('load', (event) => {
    document.getElementById("carForm")?.addEventListener("submit", createCar);
    document.getElementById("wheelsForm")?.addEventListener("submit", createWheels);
    document.getElementById("btBack")?.addEventListener("click", backCarForm);
});

function createCar(e: Event){
    e.preventDefault();

    let plate: HTMLInputElement = <HTMLInputElement>document.getElementById("plate");
    plate.value = plate.value.toUpperCase();
    let brand: HTMLInputElement = <HTMLInputElement>document.getElementById("brand");
    brand.value = brand.value.toUpperCase();
    let color: HTMLInputElement = <HTMLInputElement>document.getElementById("color");
    color.value = color.value.toUpperCase();
    car = new Car(plate.value,color.value,brand.value);
    let error: number = 0;
    // Errores
    let errplate: HTMLElement = <HTMLElement>document.getElementById("errplate");
    let errbrand: HTMLElement = <HTMLElement>document.getElementById("errbrand");
    let errcolor: HTMLElement = <HTMLElement>document.getElementById("errcolor");

    //Reset values
    plate.classList.remove("is-invalid");
    brand.classList.remove("is-invalid");
    color.classList.remove("is-invalid");
    errplate.innerHTML = "";
    errbrand.innerHTML = "";
    errcolor.innerHTML = "";

    if (!validar_plate(plate.value)){
        errplate.innerHTML = textMsn.plate;
        plate.classList.add("is-invalid");
        error++;
    } 

    if (!validar_value(plate.value)){
        errplate.innerHTML = textMsn.required;
        plate.classList.add("is-invalid");
        error++;
    }

    if (!validar_value(brand.value)){
        errbrand.innerHTML = textMsn.required;
        brand.classList.add("is-invalid");
        error++;
    }

    if (!validar_value(color.value)){
        errcolor.innerHTML = textMsn.required;
        color.classList.add("is-invalid");
        error++;
    }
    
    if (car.duplicate()){
        error++;
        alert(textMsn.duplicate);
    }

    if(error === 0){
        cars.push(car);
        alert(`The ${car.color} car ${car.brand} with plate ${car.plate} has been created`);
        sectionCar.classList.add('d-none');
        sectionWheels.classList.remove('d-none');
    }
    
}

function createWheels (e: Event){
    e.preventDefault();

    let brandWheel1: HTMLInputElement = <HTMLInputElement>document.getElementById("brandWheel1");
    let diameter1: HTMLInputElement = <HTMLInputElement>document.getElementById("diameter1");
    let brandWheel2: HTMLInputElement = <HTMLInputElement>document.getElementById("brandWheel2");
    let diameter2: HTMLInputElement = <HTMLInputElement>document.getElementById("diameter2");
    let brandWheel3: HTMLInputElement = <HTMLInputElement>document.getElementById("brandWheel3");
    let diameter3: HTMLInputElement = <HTMLInputElement>document.getElementById("diameter3");
    let brandWheel4: HTMLInputElement = <HTMLInputElement>document.getElementById("brandWheel4");
    let diameter4: HTMLInputElement = <HTMLInputElement>document.getElementById("diameter4");
    let wheelsArray: Wheel[] = new Array();
    let error: number = 0;
    // Errors in inputs
    let errdiameter1: HTMLElement = <HTMLElement>document.getElementById("errdiameter1");
    let errdiameter2: HTMLElement = <HTMLElement>document.getElementById("errdiameter2");
    let errdiameter3: HTMLElement = <HTMLElement>document.getElementById("errdiameter3");
    let errdiameter4: HTMLElement = <HTMLElement>document.getElementById("errdiameter4");
    let errBrandWheel1: HTMLElement = <HTMLElement>document.getElementById("errBrandWheel1");
    let errBrandWheel2: HTMLElement = <HTMLElement>document.getElementById("errBrandWheel2");
    let errBrandWheel3: HTMLElement = <HTMLElement>document.getElementById("errBrandWheel3");
    let errBrandWheel4: HTMLElement = <HTMLElement>document.getElementById("errBrandWheel4");

    //Reset values
    errdiameter1.innerHTML = "";
    errdiameter2.innerHTML = "";
    errdiameter3.innerHTML = "";
    errdiameter4.innerHTML = "";
    errBrandWheel1.innerHTML = "";
    errBrandWheel2.innerHTML = "";
    errBrandWheel3.innerHTML = "";
    errBrandWheel4.innerHTML = "";

    wheelsArray.push(new Wheel(parseFloat(diameter1.value), brandWheel1.value));
    wheelsArray.push(new Wheel(parseFloat(diameter2.value), brandWheel2.value));
    wheelsArray.push(new Wheel(parseFloat(diameter3.value), brandWheel3.value));
    wheelsArray.push(new Wheel(parseFloat(diameter4.value), brandWheel4.value));

    //Validate values
    if (!validar_value(brandWheel1.value)){
        errBrandWheel1.innerHTML = textMsn.required;
        brandWheel1.classList.add("is-invalid");
        error++;
    }else{
        brandWheel1.classList.remove("is-invalid");
    }

    if (!validar_value(brandWheel2.value)){
        errBrandWheel2.innerHTML = textMsn.required;
        brandWheel2.classList.add("is-invalid");
        error++;
    }else{
        brandWheel2.classList.remove("is-invalid");
    }

    if (!validar_value(brandWheel3.value)){
        errBrandWheel3.innerHTML = textMsn.required;
        brandWheel3.classList.add("is-invalid");
        error++;
    }else{
        brandWheel3.classList.remove("is-invalid");
    }

    if (!validar_value(brandWheel4.value)){
        errBrandWheel4.innerHTML = textMsn.required;
        brandWheel4.classList.add("is-invalid");
        error++;
    }else{
        brandWheel4.classList.remove("is-invalid");
    }

    if(!wheelsArray[0].validateWheel()){
        errdiameter1.innerHTML = textMsn.wheelDiameter;
        diameter1.classList.add("is-invalid");
        error++
    }else{
        diameter1.classList.remove("is-invalid");
    }

    if(!wheelsArray[1].validateWheel()){
        errdiameter2.innerHTML = textMsn.wheelDiameter;
        diameter2.classList.add("is-invalid");
        error++
    }else{
        diameter2.classList.remove("is-invalid");
    }

    if(!wheelsArray[2].validateWheel()){
        errdiameter3.innerHTML = textMsn.wheelDiameter;
        diameter3.classList.add("is-invalid");
        error++
    }else{
        diameter3.classList.remove("is-invalid");
    }

    if(!wheelsArray[3].validateWheel()){
        errdiameter4.innerHTML = textMsn.wheelDiameter;
        diameter4.classList.add("is-invalid");
        error++
    }else{
        diameter4.classList.remove("is-invalid");
    }

    if(error === 0){    
        for (let i = 0; i < wheelsArray.length; i++) {
            car.addWheel(wheelsArray[i]);
        }  
        sectionWheels.classList.add('d-none');
        sectionCar.classList.remove('d-none');
        buildCar(); 
    }
}

function buildCar(){
    let showCar: HTMLInputElement = <HTMLInputElement>document.getElementById("sectionCarsCreate");
    let newCar: Car = cars[cars.length - 1];
    let arrayWheels: Wheel[] = car.wheels;
    let arrayText: string = "";
    let text: string = "";

    for (let i = 0; i < arrayWheels.length; i++) {
        arrayText= arrayText + arrayWheels[i].codeDetails(i + 1);
    }

    text = text + newCar.codeDetails(arrayText);

    sectionCar.classList.remove('d-none');
    showCar.insertAdjacentHTML("beforeend", text);
}

function validar_plate(plate: string){
    var regex = /^[0-9]{4}[A-Z,a-z]{3}$/
	return regex.test(plate) ? true : false;
}

function validar_value(value: string | number){
    if (value === '') {
        return false;
    } else {
        return true;
    }
}

function backCarForm(){
    cars.pop();
    sectionWheels.classList.add('d-none');
    sectionCar.classList.remove('d-none');
    restarWheelForm();
}

export { cars };

function restarWheelForm(){
    let brandWheel1: HTMLInputElement = <HTMLInputElement>document.getElementById("brandWheel1");
    let diameter1: HTMLInputElement = <HTMLInputElement>document.getElementById("diameter1");
    let brandWheel2: HTMLInputElement = <HTMLInputElement>document.getElementById("brandWheel2");
    let diameter2: HTMLInputElement = <HTMLInputElement>document.getElementById("diameter2");
    let brandWheel3: HTMLInputElement = <HTMLInputElement>document.getElementById("brandWheel3");
    let diameter3: HTMLInputElement = <HTMLInputElement>document.getElementById("diameter3");
    let brandWheel4: HTMLInputElement = <HTMLInputElement>document.getElementById("brandWheel4");
    let diameter4: HTMLInputElement = <HTMLInputElement>document.getElementById("diameter4");

    (<HTMLInputElement>document.getElementById("brandWheel1")).value = "";
    (<HTMLInputElement>document.getElementById("diameter1")).value = "";
    (<HTMLInputElement>document.getElementById("brandWheel2")).value = "";
    (<HTMLInputElement>document.getElementById("diameter2")).value = "";
    (<HTMLInputElement>document.getElementById("brandWheel3")).value = "";
    (<HTMLInputElement>document.getElementById("diameter3")).value = "";
    (<HTMLInputElement>document.getElementById("brandWheel4")).value = "";
    (<HTMLInputElement>document.getElementById("diameter4")).value = "";

    brandWheel1.classList.remove("is-invalid");
    brandWheel2.classList.remove("is-invalid");
    brandWheel3.classList.remove("is-invalid");
    brandWheel4.classList.remove("is-invalid");
    diameter1.classList.remove("is-invalid");
    diameter2.classList.remove("is-invalid");
    diameter3.classList.remove("is-invalid");
    diameter4.classList.remove("is-invalid");

}


