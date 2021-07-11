export class TextMsn{
    public required:string;
    public plate:string;
    public wheelDiameter: string;
    public duplicate: string;

    constructor(){
        this.required="Values Required";
        this.plate="Error en format of Plate. Ex. 1234ABC";
        this.wheelDiameter="The value of diameter is between 0,4 and 2";
        this.duplicate="This car is already registrered";
    }
}