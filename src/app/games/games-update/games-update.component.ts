import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Game } from 'src/app/models/game.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-games-update',
  templateUrl: './games-update.component.html',
  styleUrls: ['./games-update.component.css']
})
export class GamesUpdateComponent implements OnInit {
  private game: Game;
  private gameSub: Subscription;
  private gameId: string;
  private updateGameForm: FormGroup;

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => this.gameId = params.gameId);

    this.gameService.getGameById(this.gameId);
    this.gameSub = this.gameService.getGameByIdUpdateListener()
      .subscribe((gameData: { game: Game }) => {
        this.game = gameData.game;
      });

    this.updateGameForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      platform: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required)
    });
  }

  updateGame(gameId: string) {
    this.gameService.updateGame(gameId, this.updateGameForm.value);
  }
}
