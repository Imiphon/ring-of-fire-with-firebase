import { Component, Input, } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  //is coming from <app-player> in main-game-component.
  //is going to player.component.html/...{{ name }}
  @Input() name!: string;
  //activePlayerVar from/for main-game.components.html
  @Input() playerActive:boolean = false;
}
