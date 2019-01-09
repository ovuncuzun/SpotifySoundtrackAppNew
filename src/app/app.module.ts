import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule  } from '@angular/common/http'
import { AppComponent } from './app.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot()
  
  ],
  providers: [
    NotificationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
