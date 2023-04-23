import { TestBed } from '@angular/core/testing';
import { isArray, sum } from 'lodash-es';
import { FtPlate } from './ft-plate';
import { FtPlateService } from './ft-plate.service';

describe('FtPlateService', () => {
  let service: FtPlateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FtPlateService]
    });
    service = new FtPlateService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be undefined with invalid input', () => {
    const actual = service.getLargestPlateUnderWeight(0);
    expect(actual).toEqual(undefined);
  });

  it('should get all plates for 70lbs', () => {
    const actual = service.getPlates(70);
    const plate5 = new FtPlate();
    plate5.setWeight(FtPlateService.PLATE_5);
    const expected: any = { 
      'left': [plate5], 
      'right': [plate5] 
    };
    expect(expected).toEqual(actual);
  });

  it('should get all plates for 220lbs', () => {
    const actual = service.getPlates(220);
    const plate45 = new FtPlate();
    plate45.setWeight(FtPlateService.PLATE_45);
    const plate25 = new FtPlate();
    plate25.setWeight(FtPlateService.PLATE_25);
    const plate10 = new FtPlate();
    plate10.setWeight(FtPlateService.PLATE_10);
    const expected: any = {
      'left': [
        plate45,        
        plate25,
        plate10,
      ],
      'right': [
        plate45,
        plate25,
        plate10
      ]
    };
    expect(expected.left).toEqual(actual.left);
  });

  it('should get all plates for 135lbs', () => {
    const actual = service.getPlates(135);
    const plate25 = new FtPlate();
    plate25.setWeight(FtPlateService.PLATE_25);
    const plate10 = new FtPlate();
    plate10.setWeight(FtPlateService.PLATE_10);
    const plateHalf = new FtPlate();
    plateHalf.setWeight(FtPlateService.PLATE_HALF);

    const expected: any = {
      'left': [
        plate25,
        plate10,
        plateHalf
      ],
      'right': [
        plate25,
        plate10,
        plateHalf
      ]
    };
    expect(expected).toEqual(actual);
  });

  it('should get weight with warmup reduction', () => {
    // 90lbs
    const actual = service.getPlates(225, .40);
    const plate10 = new FtPlate();
    plate10.setWeight(FtPlateService.PLATE_10);
    const plate5 = new FtPlate();
    plate5.setWeight(FtPlateService.PLATE_5);
    const expected: any = {
      'left': [
        plate10,
        plate5
      ],
      'right': [
        plate10,
        plate5
      ]
    };
    expect(expected).toEqual(actual);
  });

  it('should get get class name for plate based on weight', () => {
    const actual = service.getPlateClassName(45);
    const expected = 'plate-45';
    expect(expected).toEqual(actual);
  });

  it('should get get class name for plate based on weight (half case)', () => {
    const actual = service.getPlateClassName(2.5);
    const expected = 'plate-half';
    expect(expected).toEqual(actual);
  });
});
