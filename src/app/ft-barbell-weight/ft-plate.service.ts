import { Injectable } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { identity, keyBy, reverse, sortBy } from 'lodash-es';
import { find } from 'lodash-es';
import { min } from 'lodash-es';
import { FtPlate } from './ft-plate';
import { FtPlates } from './ft-plates.enum';

@Injectable({
  providedIn: 'root'
})
export class FtPlateService {
  static readonly BAR_WEIGHT = 60;
  static readonly PLATE_HALF = 2.5;
  static readonly PLATE_5 = 5;
  static readonly PLATE_10 = 10;
  static readonly PLATE_25 = 25;
  static readonly PLATE_45 = 45;
  static readonly ALL_PLATES = [
    FtPlateService.PLATE_45,
    FtPlateService.PLATE_25,
    FtPlateService.PLATE_10,
    FtPlateService.PLATE_5,
    FtPlateService.PLATE_HALF
  ];

  constructor() { }

  /**
   * Returns an array of plates representing the supplied
   * weight
   * @param weight int
   * @param warmupReductionAmount - float
   * @returns any[]
   */
  getPlates(weight: number, warmupReductionAmount: number = 0): any {
    let plates: any = [];
    let plateWeight: number | undefined = 0;
    let totalWeight = weight;

    if (warmupReductionAmount > 0) {
      totalWeight *= warmupReductionAmount;
    }

    if (weight > FtPlateService.BAR_WEIGHT) {
      // First remove the weight of the bar
      totalWeight -= FtPlateService.BAR_WEIGHT;
      // The weight on each side is identical
      totalWeight /= 2;

      while (totalWeight > 0) {
        plateWeight = this.getLargestPlateUnderWeight(totalWeight);
        if (plateWeight) {
          const plate = new FtPlate();
          plate.setWeight(plateWeight);
          plates.push(plate);
          totalWeight -= plateWeight;
        }
      }

      // Duplicate original array so that the weight
      // is equal on both sides.
      //plates = plates.concat(plates);
    }

    const leftPlates = sortBy(plates, 'weight');
    const rightPlates = reverse(leftPlates);

    return {
      'left': leftPlates,
      'right': rightPlates
    };
  }

  getAllPlates(): any {
    return FtPlateService.ALL_PLATES;
  }

  getSmallestPlate(weight: number): number | undefined {
    return min(this.getAllPlates());
  }

  getLargestPlateUnderWeight(weight: number): number | undefined {
    let plateWeights: any = this.getAllPlates();
    return find(plateWeights, (p: number) => {
      return p <= weight;
    });
  }

  getPlateClassName(weight: number) {
    if (weight === 2.5) {
      return 'plate-half';
    }
    return 'plate-'+weight;
  }
}
