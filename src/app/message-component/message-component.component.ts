import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';
@Component({
  selector: 'app-message-component',
  templateUrl: './message-component.component.html',
  styleUrls: ['./message-component.component.css']
})
export class MessageComponentComponent {
  messages: any[];

  clear(){
    this.messageService.clear()
  }

  constructor(private messageService: MessageService) {
    this.messages = messageService.getMessages();
  }
}
