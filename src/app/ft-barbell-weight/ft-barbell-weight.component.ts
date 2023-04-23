import { Component, Input, OnInit } from '@angular/core';
import { FtPlateService } from './ft-plate.service';

@Component({
  selector: 'ft-barbell-weights',
  templateUrl: './ft-barbell-weight.component.html',
  styleUrls: ['./ft-barbell-weight.component.scss']
})
export class FtBarbellWeightComponent implements OnInit {
  @Input()
  weight: number = 0;
  @Input()
  warmupReductionAmount: number = 0;
  plates: any = [];

  constructor(private ftPlateService: FtPlateService) { }

  ngOnInit(): void {
    this.plates = this.ftPlateService.getPlates(this.weight, this.warmupReductionAmount);
  }
}
