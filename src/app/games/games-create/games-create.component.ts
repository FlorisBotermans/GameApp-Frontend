import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-games-create',
  templateUrl: './games-create.component.html',
  styleUrls: ['./games-create.component.css']
})
export class GamesCreateComponent implements OnInit {
  private createGameForm: FormGroup;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.createGameForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      platform: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required)
    })
  }

  createGame() {
    this.gameService.createGame(this.createGameForm.value);
  }
}
