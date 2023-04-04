import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { cooking } from './interfaces';
import { AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { doc, getDoc } from "firebase/firestore";



@Injectable({
  providedIn: 'root'
})
export class CookingService {
  constructor(private afs: AngularFirestore){}
  private filters: any[] = [];

  add(filter: string[]) {
    this.filters = filter;
    console.log(filter)
  }

  getFilters(): string[] {
    return this.filters;
  }
  clear() {
    this.filters.length = 0
  }

  addRecipe(meal:any){
    this.afs.doc("/recipes/"+ meal.id).set(meal)
    .then(() => {
        alert(`added ${meal.name}`)
    })
     .catch(error => {
        console.log(error)
        alert(error)
    }) 
    }
//all recipes
    getRecipes(): Observable<any[]>{
      let data : any = [];
      const collection = this.afs.collection<any[]>('recipes');
      collection.get().subscribe(snapshot => {
        snapshot.forEach((res) => {
          data.push(res.data());
        });
      });
      const mealz = of(data)
    return mealz;
    }
    

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

  public myData = new Subject<any>();
   
   /*  getData() : Observable<any>{
    return this.myData.asObservable()
  }   */

  //single meal recipe
  getDataFromFirestore(collectionName: string, documentId: string): Observable<any> {
    return this.afs.collection(collectionName).doc(documentId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          if (doc.payload.exists) {
            return doc.payload.data();
          } else {
            return null;
          }
        })
      );
  }
}
