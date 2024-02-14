import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { MainGameComponent } from "./main-game/main-game.component";
import { NgModule } from '@angular/core';


 export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: LandingPageComponent },
    { path: 'gameStart', component: MainGameComponent },
    { path: 'gameStart/:gameId', component: MainGameComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule {}