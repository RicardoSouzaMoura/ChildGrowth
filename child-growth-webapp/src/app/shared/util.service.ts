import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  // retorna a diferenca em meses: date2 - date1
  // se date2 or anterior retorna negativo
  getDifMonths(date1: Date, date2: Date) {

    let startDate = date1;
    let endDate = date2;
    let inverse = 1;

    if (date1.getTime() > date2.getTime()) {
      startDate = date2;
      endDate = date1;
      inverse = -1;
    }
    let difYear = endDate.getFullYear() - startDate.getFullYear();
    let difMonth = endDate.getMonth() - startDate.getMonth();
    let difDay = endDate.getDate() - startDate.getDate();

    // console.log("difYear: "+difYear);
    // console.log("difMonth: "+difMonth);
    // console.log("difDay: "+difDay);

    let qtdMonths = inverse * ((difYear * 12) + difMonth + (difDay < 0 ? -1 : 0));

    console.log("qtdMonths: "+qtdMonths );
    return qtdMonths;
  }

  calculaBMI(height: number, weight: number){
    return Math.round(weight/Math.pow(height/100,2) * 100)/100;
  }

}
