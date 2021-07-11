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
//# sourceMappingURL=wheel.js.map