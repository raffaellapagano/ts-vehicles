import { Wheel } from "./wheel";
import { cars } from "../controllers/controller"

export class Car{
    plate:string;
    color:string;
    brand:string;
    wheels:Wheel[]=new Array();
    
    constructor(plate:string,color:string,brand:string){
        this.plate=plate;
        this.color=color;
        this.brand=brand;
    }
    
    addWheel(wheel:Wheel):void{
        this.wheels.push(wheel);
    }

    duplicate() :any{
        let validacion: boolean = false;
        for (let i = 0; i < cars.length; i++) {
            if(this.plate === cars[i].plate){
                validacion = true;
            }            
        }
        return validacion;
    }

   public codeDetails(wheelData: string) : string {
        let code: string = `
        <section id="cardCar" class="container m-3 m-auto w-75 p-2 animate__animated animate__backInDown border card shadow">
            <h5 class="font-weight-bold">Car ${ this.plate }</h5>
            <div class="row">
                <div class="col-6 col-md-3 d-flex w-100 overflow-auto">
                <span class="font-weight-bold mr-1">Matrícula:</span>
                <span class="text-break">${ this.plate }</span>
                </div>
                <div class="col-6 col-md-3 d-flex w-100 overflow-auto">
                <span class="font-weight-bold mr-1">Marca:</span>
                <span class="text-break">${ this.brand }</span>
                </div>
                <div class="col-12 col-md-3 d-flex w-100 overflow-auto">
                <span class="font-weight-bold mr-1">Color:</span>
                <span class="text-break">${ this.color }</span>
                </div>
            </div>
            <hr>
            <h5 class="font-weight-bold">Rodes</h5>
            <div class="row d-flex justify-content-center">
                ${ wheelData }
            </div>
        </section>
        `;

        return code;
    }
}