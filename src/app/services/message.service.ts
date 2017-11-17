import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  /** @param messages - string[] for storage messages */
  messages: string[] = [];

  /**
   * Add message to the app-message component
   * @param message - text of message
   */
  add(message: string) {
    this.messages.push(message);
  }

  /** Clear messages from the app-message component */
  clear() {
    this.messages.length = 0;
  }
}
