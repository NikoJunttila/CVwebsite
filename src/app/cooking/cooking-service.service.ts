import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { cooking } from './interfaces';
import { meals } from './meals';


@Injectable({
  providedIn: 'root'
})
export class CookingService {

  private subject = new Subject<any>();

  sendClickEvent(){
    this.subject.next("");
  }
  getClickEvent():Observable<any>{
    return this.subject.asObservable()
  }
  private subject2 = new Subject<any>();

  sendClickEvent2(){
    this.subject2.next("");
  }
  getClickEvent2():Observable<any>{
    return this.subject2.asObservable()
  }

  getMeals() : Observable<cooking[]>{
    const mealz = of(meals.sort((a,b)=> b.rating - a.rating))
    return mealz;
  }

  getLenght() : Observable<number>{
    const mealz = of(meals.length)
    return mealz;
  }

  public myData = new Subject<any>();
  
/*   getData() : Observable<any>{
    return this.myData.asObservable()
  } */

  getMeal(id:number): Observable <cooking> {
    const meal = meals.find(h => h.id === id)!;
    return of(meal)
  } 
  constructor() { }
}
