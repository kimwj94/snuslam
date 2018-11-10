import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Room } from '../room';
import { User } from '../user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private  url = "api/room";

  constructor(
     private http: HttpClient
    ) { }

  getAllRoom(): Observable<Room[]>{
    return this.http.get<Room[]>(this.url);
  }
  getRoomById(id: number): Observable<Room>{
    const url = `${this.url}/${id}`;
    return this.http.get<Room>(url);

  }
  addRoom(room: Room): Observable<Room>{
    return this.http.post<Room>(this.url,room,httpOptions);
  }
  deleteRoomById(id: number): Observable<void>{
    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }
  updateRoom(room : Room): Observable<void>{
    const url = `${this.url}/${room.id}`;
    return this.http.put<void>(url,room,httpOptions);
  }
  getUser(): Observable<User>{
    const url = "api/user/1";  //mock
    return this.http.get<User>(url);
  }

}
