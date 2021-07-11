export class Wheel{
    public diameter:number;
    public brand:string;

    constructor(diameter:number, brand:string){
        this.diameter=diameter;
        this.brand=brand;
    }

    public codeDetails(numero: number): string {
        let code: string = `
            <div class=" wheelDetail border border-primary rounded-circle m-2">
                <div class="d-flex flex-column p-1">
                <h6 class="font-weight-bold text-center">Wheel ${ numero }</h6>
                <div class="d-flex justify-content-center">
                    Brand: ${ this.brand }
                </div>
                <div class="d-flex justify-content-center">
                    Diameter: ${ this.diameter }
                </div>
            </div>
        </div>
        `;

        return code;
    }

    validateWheel(): boolean{
        if ((this.diameter >= 0.4) && (this.diameter <= 2)){
            return true;
        }else{
            return false;
        }

    }
}