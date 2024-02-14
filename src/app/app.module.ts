import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideAuth(() => getAuth()), 
  ],
  providers: [],
})
export class AppModule { }



