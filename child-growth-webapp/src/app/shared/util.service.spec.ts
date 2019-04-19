import { TestBed } from '@angular/core/testing';

import { UtilService } from './util.service';

describe('UtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service).toBeTruthy();
  });

  it('should return 6 months same year, same day', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2018, 1, 15), new Date(2018, 7, 15))).toEqual(6);
  });
  it('should return 6 months same year, day bigger', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2018, 1, 15), new Date(2018, 7, 16))).toEqual(6);
  });
  it('should return 5 months same year, day smaller', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2018, 1, 15), new Date(2018, 7, 14))).toEqual(5);
  });
  it('should return 12 months next year, same month, same day', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2018, 1, 15), new Date(2019, 1, 15))).toEqual(12);
  });
  it('should return 12 months next year, same month, day bigger', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2018, 1, 15), new Date(2019, 1, 16))).toEqual(12);
  });
  it('should return 11 months next year, same month, day smaller', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2018, 1, 15), new Date(2019, 1, 14))).toEqual(11);
  });
  it('should return 14 months next year, next month, same day', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2018, 1, 15), new Date(2019, 3, 15))).toEqual(14);
  });
  it('should return 14 months next year, next month, day bigger', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2018, 1, 15), new Date(2019, 3, 16))).toEqual(14);
  });
  it('should return 13 months next year, next month, day smaller', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2018, 1, 15), new Date(2019, 3, 14))).toEqual(13);
  });
  it('should return 11 months next year, next month, day smaller', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2018, 4, 15), new Date(2019, 3, 16))).toEqual(11);
  });
  it('should return 10 months next year, next month, day smaller', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2018, 4, 15), new Date(2019, 3, 14))).toEqual(10);
  });


  it('should return -6 months same year, same day', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2018, 7, 15), new Date(2018, 1, 15))).toEqual(-6);
  });
  it('should return -6 months same year, day bigger', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2018, 7, 16), new Date(2018, 1, 15))).toEqual(-6);
  });
  it('should return -5 months same year, day smaller', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2018, 7, 14), new Date(2018, 1, 15))).toEqual(-5);
  });
  it('should return -12 months next year, same month, same day', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2019, 1, 15), new Date(2018, 1, 15))).toEqual(-12);
  });
  it('should return -12 months next year, same month, day bigger', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2019, 1, 16), new Date(2018, 1, 15))).toEqual(-12);
  });
  it('should return -11 months next year, same month, day smaller', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2019, 1, 14), new Date(2018, 1, 15))).toEqual(-11);
  });
  it('should return -14 months next year, next month, same day', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2019, 3, 15), new Date(2018, 1, 15))).toEqual(-14);
  });
  it('should return -14 months next year, next month, day bigger', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2018, 1, 15), new Date(2019, 3, 16))).toEqual(14);
  });
  it('should return 13 months next year, next month, day smaller', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2019, 3, 14), new Date(2018, 1, 15))).toEqual(-13);
  });
  it('should return -11 months next year, next month, day smaller', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2019, 3, 16), new Date(2018, 4, 15))).toEqual(-11);
  });
  it('should return -10 months next year, next month, day smaller', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.getDifMonths(new Date(2019, 3, 14), new Date(2018, 4, 15))).toEqual(-10);
  });

  // calculo do BMI
  it('should return 20', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.calculaBMI(100, 20)).toEqual(20);
  });
  it('should return 20', () => {
    const service: UtilService = TestBed.get(UtilService);
    expect(service.calculaBMI(120, 23)).toEqual(15.97);
  });

});