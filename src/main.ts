import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
//coming from notes-project
//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import { AppModule } from './app/app.module';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));




//coming from notes-project
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));