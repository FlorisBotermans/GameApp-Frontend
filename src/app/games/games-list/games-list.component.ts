import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from 'src/app/models/game.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  private games: Game[] = [];
  private gameSub: Subscription;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getGames();
    this.gameSub = this.gameService.getGameUpdateListener()
      .subscribe((gameData: { games: Game[] }) => {
        this.games = gameData.games;
      });
  }

  deleteGame(gameId: string) {
    this.gameService.deleteGame(gameId);
  }
}
