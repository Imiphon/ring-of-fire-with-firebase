<<<<<<< HEAD
import { Component } from '@angular/core'; //Diese Zeile importiert die Component-Dekoration aus dem Angular Core-Paket. Die Component-Dekoration wird verwendet, um eine Klasse als Angular-Komponente zu kennzeichnen, mit Metadaten wie Selektor, Template-URLs und Styles.
import { CommonModule } from '@angular/common'; //Hier wird das CommonModule aus dem @angular/common-Paket importiert. Dieses Modul stellt allgemeine Direktiven, Pipes und Services bereit, die in vielen Angular-Anwendungen verwendet werden. Beispiele sind Direktiven wie ngIf und ngFor. Es wird häufig in Feature-Modulen importiert, um diese allgemeinen Funktionen zugänglich zu machen.
import { RouterOutlet, Router, RouterLink } from '@angular/router'; // Diese Zeile importiert RouterOutlet aus dem @angular/router-Paket. RouterOutlet ist eine Direktive in Angular, die als Platzhalter fungiert, an dem geroutete Ansichten (Komponenten) im Template einer Anwendung angezeigt werden. Es wird in Templates verwendet, um anzugeben, wo der Inhalt einer gerouteten Komponente gerendert werden soll.
=======
import { Component } from '@angular/core'; //wird verwendet, um eine Klasse als Angular-Komponente zu kennzeichnen, mit Metadaten wie Selektor, Template-URLs und Styles.
import { CommonModule } from '@angular/common'; // Dieses Modul stellt allgemeine Direktiven, Pipes und Services bereit, die in vielen Angular-Anwendungen verwendet werden. Beispiele sind Direktiven wie ngIf und ngFor. Es wird häufig in Feature-Modulen importiert, um diese allgemeinen Funktionen zugänglich zu machen.
import { RouterOutlet, Router, RouterLink } from '@angular/router'; //  Es wird in Templates verwendet, um anzugeben, wo der Inhalt einer gerouteten Komponente gerendert werden soll.
>>>>>>> ba2eb0ccef6bca105b9f15764f0ec9942facc815
import { FirestoreService } from "./../firebase-service/firebase-service.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { Game } from "./../../game";


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule, 
    FormsModule,
    RouterLink
  ],

  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'] 
})

export class LandingPageComponent {
  gameId: string = '';
  game!: Game;

  constructor(private firestoreService: FirestoreService, private router: Router) {

  }
  async joinGame() {
    const gameExists = await this.firestoreService.checkGameExists(this.gameId);
    if (gameExists) {         
      this.router.navigate(['/gameStart/', this.gameId]);  
      //this.game.gameId = this.gameId;   
    } else {
      alert('Game ID does not exist.'); 
    }
  }
}
