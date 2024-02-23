import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  //is coming from <app-player> in main-game-component.html
  //is going to player.component.html/...{{ name }}
  @Input() name!: string;
  //activePlayerVar from/for main-game.components.html
  @Input() playerActive:boolean = false;
  @Output() playerClicked =new EventEmitter<string>(); 

  onClick(): void {
    this.playerClicked.emit(this.name);
  }
}
