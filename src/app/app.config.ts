import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

const firebaseConfig = {
  apiKey: "AIzaSyBDjYkDAB4HagWgtLcuufpHUAGUzWY9iPw",
  authDomain: "pplabiv.firebaseapp.com",
  projectId: "pplabiv",
  storageBucket: "pplabiv.appspot.com",
  messagingSenderId: "901362346498",
  appId: "1:901362346498:web:07e681aa8f37e41e56551b"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(), 
    provideAnimations(), // required animations providers
    provideToastr(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()), 
    provideStorage(() => getStorage()), 
    provideAnimationsAsync()]
};
