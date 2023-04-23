import { Injectable } from "@angular/core";
import { FtPlateService } from "./ft-plate.service";

export class FtPlate {
    service: FtPlateService;
    weight: number = 0;
    private className: string = "";

    constructor() {
        this.service = new FtPlateService();
    }

    setWeight(weight: number) {
        this.weight = weight;
        this.className = this.service.getPlateClassName(this.weight);
    }

    toString() {
        return this.weight;
    }
}