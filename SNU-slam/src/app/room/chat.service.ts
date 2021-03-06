import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

export interface Message {
	username: string,
	message: string
}

@Injectable()
export class ChatService {
  public messages: Subject<Message>;
	baseUrl = environment.API_URL;
	CHAT_URL = 'ws://' + this.baseUrl + '/ws/chat/';

  constructor(
		private wsService: WebsocketService,
		private route: ActivatedRoute
	) {
		const id = +this.route.snapshot.paramMap.get('id');
		this.CHAT_URL += id + '/';
    this.messages = <Subject<Message>>wsService
      .connect(this.CHAT_URL)
      .pipe(map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          username: data.username,
          message: data.message
        }
      }));
  }
}
