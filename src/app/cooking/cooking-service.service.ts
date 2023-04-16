import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { cooking } from './interfaces';
import { AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { doc, getDoc, Timestamp } from "firebase/firestore";



@Injectable({
  providedIn: 'root'
})
export class CookingService {
  constructor(private afs: AngularFirestore){}
  private filters: any[] = [];
  private cachedMeals: any[] = [];


  add(filter: string[]) {
    this.filters = filter;
  }

  getFilters(): string[] {
    return this.filters;
  }
  clear() {
    this.filters.length = 0
  }

  addRecipe(meal:any){
    this.afs.collection("lastUpdate").doc("dates").set({date: new Date()})
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
/*     getRecipes(): Observable<any[]>{
      let data : any = [];
      const collection = this.afs.collection<any[]>('recipes');
      collection.get().subscribe(snapshot => {
        snapshot.forEach((res) => {
          data.push(res.data());
        });
      });
      const mealz = of(data)
    return mealz;
    } */
    //cached versio
   getRecipes(): Observable<any[]> {
      const cacheKey = 'cachedMeals';
      let cachedData = JSON.parse(localStorage.getItem(cacheKey) || "[]") ;
      if (cachedData.length > 0) {
      //date from firestore
      const date =  this.afs.collection("lastUpdate").doc("dates")
        .get()
        .pipe(
          map(doc => {
            const dateData = doc.data() as { date: Timestamp };
            return dateData.date
          })
        );
        //last cache update time
        const cacheSaveDate = JSON.parse(localStorage.getItem('cacheSaveDate') || '[]');

        const dateSub : any = date.subscribe(dateValue => {
        const jsDate = new Date(cacheSaveDate)
        const firestoreDate = new Date(dateValue.seconds * 1000 + dateValue.nanoseconds / 1000000)
        if (jsDate.getTime() < firestoreDate.getTime()) {
          cachedData = this.updateCacheData().subscribe(data => {

         })
        } else {
          this.cachedMeals = cachedData
         dateSub.unsubscribe()
        }
        });
        return of(cachedData);
      } else {
        const collection = this.afs.collection<any[]>('recipes');
        return collection.get().pipe(
          map(snapshot => {
            const data : any[] = [];
            snapshot.forEach((doc: any) => {
              data.push(doc.data());
            });
            data.sort((a: any, b: any) => b.rating - a.rating);
            this.cachedMeals = data; // cache the data
            localStorage.setItem("cacheSaveDate",JSON.stringify(new Date()))
            localStorage.setItem(cacheKey, JSON.stringify(data));
            return data;
          })
        );
      }
    }

 updateCacheData(){
  const collection = this.afs.collection<any[]>('recipes');
  return collection.get().pipe(
    map(snapshot => {
      const data : any[] = [];
      snapshot.forEach((doc: any) => {
        data.push(doc.data());
      });
      data.sort((a: any, b: any) => b.rating - a.rating);
      this.cachedMeals = data; // cache the data
      localStorage.setItem("cacheSaveDate",JSON.stringify(new Date()))
      localStorage.setItem("cachedMeals", JSON.stringify(data));
      return data;
    })
  );
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
    //cached
    if(this.cachedMeals.length > 0){
      const foundObject = this.cachedMeals.find((obj) => obj.id == documentId);
      return of(foundObject)
    } else {
      //if loading directly on recipe
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

}
