import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environment";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideAnimations(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
    importProvidersFrom(provideFirestore(() => getFirestore()))    
  ]
};
