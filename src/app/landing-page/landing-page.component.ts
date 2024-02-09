import { Component } from '@angular/core'; //Diese Zeile importiert die Component-Dekoration aus dem Angular Core-Paket. Die Component-Dekoration wird verwendet, um eine Klasse als Angular-Komponente zu kennzeichnen, mit Metadaten wie Selektor, Template-URLs und Styles.
import { CommonModule } from '@angular/common'; //Hier wird das CommonModule aus dem @angular/common-Paket importiert. Dieses Modul stellt allgemeine Direktiven, Pipes und Services bereit, die in vielen Angular-Anwendungen verwendet werden. Beispiele sind Direktiven wie ngIf und ngFor. Es wird häufig in Feature-Modulen importiert, um diese allgemeinen Funktionen zugänglich zu machen.
import { RouterOutlet } from '@angular/router'; // Diese Zeile importiert RouterOutlet aus dem @angular/router-Paket. RouterOutlet ist eine Direktive in Angular, die als Platzhalter fungiert, an dem geroutete Ansichten (Komponenten) im Template einer Anwendung angezeigt werden. Es wird in Templates verwendet, um anzugeben, wo der Inhalt einer gerouteten Komponente gerendert werden soll.

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
