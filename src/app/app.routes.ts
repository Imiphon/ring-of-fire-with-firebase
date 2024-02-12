import { Routes } from '@angular/router';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { MainGameComponent } from "./main-game/main-game.component";

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: LandingPageComponent },
    { path: 'gameStart', component: MainGameComponent },
];
