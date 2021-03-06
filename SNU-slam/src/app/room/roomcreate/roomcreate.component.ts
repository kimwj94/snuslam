import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { Room } from '../../room';
import { Router } from '@angular/router';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-roomcreate',
  templateUrl: './roomcreate.component.html',
  styleUrls: ['./roomcreate.component.css']
})
export class RoomcreateComponent implements OnInit {
  id: number;
  title: string = '';
  location: string;
  play_time: number;
  type: number;

  constructor(
    private roomService: RoomService,
    private router: Router,
    private userservice: UserService
  ) { }

  ngOnInit() {
    this.id = this.userservice.getUser().id;
  }
  createroom() {
    if (this.title.trim().length == 0 || this.location.trim().length == 0 ||
      this.play_time == null || this.type == null) {
      alert('Enter all information.');
      return;
    }

    const check = confirm('Title: ' + this.title + '\n' + 'Location: ' + this.location + '\n' + 'Play time: ' +
      this.play_time + ' min' + '\n' + 'Type: ' + this.type + ':' + this.type + '\n' + 'Is it correct?');

    const newroom = {
      title: this.title,
      host: this.id,
      guests_id: [],
      location: this.location,
      play_time: this.play_time,
      type: this.type
    };
    if (check) {
      this.roomService.addRoom( newroom as Room ).subscribe(

        room => this.goRoom(room.id)
      );
    }

  }
  goRoom(id: number) {
    this.router.navigate([`room/${id}`]);

  }
}
