import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: any[] = [];

  add(message: string, type:string) {
    this.clear()
    this.messages.push({message,type});
     setTimeout(() =>{
      this.messages.length = 0
  } ,4000) 
  }

  clear() {
    this.messages.length = 0
  }

  getMessages(): string[] {
    return this.messages;
  }

  constructor() { }
}
