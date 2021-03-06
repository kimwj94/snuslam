# chat/consumers.py
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json

class RoomConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = 'room' + self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # 그룹에 Join 하는 메서드이다.
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # 그룹을 leave 하는 메서드이다.
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # 웹소켓으로부터 메세지를 받아 처리하는 부분이다.
    # 아래에서는 그룹으로 메세지를 보내고 있다.
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        id = text_data_json['id']
        team = text_data_json['team']
        getOut = text_data_json['getOut']
        start = text_data_json['start']

        # 그룹으로 메세지를 돌려보내주는 부분이다.
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'id': id,
                'team': team,
                'getOut': getOut,
                'start': start
            }
        )

    # 위의 receive 메서드에서 그룹으로 메세지를 보내면 그 메세지를 받아 처리하는 부분이다.
    def chat_message(self, event):
        id = event['id']
        team = event['team']
        getOut = event['getOut']
        start = event['start']

        # 클라이언트로 웹소켓을 통해 받은 메세지를 다시 보내주는 부분이다.
        self.send(text_data=json.dumps({
            'id': id,
            'team': team,
            'getOut': getOut,
            'start': start
        }))


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = 'chat' + self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # 그룹에 Join 하는 메서드이다.
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # 그룹을 leave 하는 메서드이다.
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # 웹소켓으로부터 메세지를 받아 처리하는 부분이다.
    # 아래에서는 그룹으로 메세지를 보내고 있다.
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        username = text_data_json['username']
        message = text_data_json['message']

        # 그룹으로 메세지를 돌려보내주는 부분이다.
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'username': username,
                'message': message
            }
        )

    # 위의 receive 메서드에서 그룹으로 메세지를 보내면 그 메세지를 받아 처리하는 부분이다.
    def chat_message(self, event):
        username = event['username']
        message = event['message']

        # 클라이언트로 웹소켓을 통해 받은 메세지를 다시 보내주는 부분이다.
        self.send(text_data=json.dumps({
            'username': username,
            'message': message
        }))

