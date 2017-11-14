// @angular imports
import { Component, OnInit } from '@angular/core';

// services imports
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(
    public messageService: MessageService) {}

  ngOnInit() {
  }

}
