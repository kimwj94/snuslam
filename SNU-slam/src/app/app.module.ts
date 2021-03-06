import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS, HttpXsrfTokenExtractor} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainComponent } from './main/main.component';
import { RankComponent } from './rank/rank.component';
import { TournamentModule } from './tournament/tournament.module';
import { RoomModule } from './room/room.module';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserService } from "./services/user.service";

import { APIInterceptor } from "./APIInterceptor";
import {
  HttpXsrfCookieExtractor,
  HttpXsrfInterceptor,
  XSRF_COOKIE_NAME,
  XSRF_HEADER_NAME
} from "@angular/common/http/src/xsrf";


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    MainComponent,
    RankComponent,
    SignInComponent,
  ],
  imports: [
    ReactiveFormsModule,
    NgbModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TournamentModule,
    RoomModule,
    AppRoutingModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    //  ),
  ],
  exports: [
    SignInComponent
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
