import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Game } from '../models/game.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  games: Game[];
  private game: Game;
  private gamesUpdated = new Subject<{ games: Game[] }>();
  private gameUpdated = new Subject<{ game: Game }>();
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getGameUpdateListener() {
    return this.gamesUpdated.asObservable();
  }

  getGameByIdUpdateListener() {
    return this.gameUpdated.asObservable();
  }

  createGame(formValue: any) {
    this.http.post<any>('https://shielded-hamlet-18741.herokuapp.com/api/games', formValue)
      .subscribe((response) => {
        this.router.navigate(['games-list']);
      });
  }

  getGames() {
    this.http.get<any>('https://shielded-hamlet-18741.herokuapp.com/api/games')
      .pipe(map((data) => {
        return data.map(game => {
          return {
            gameId: game._id,
            name: game.name,
            description: game.description,
            platform: game.platform,
            category: game.category,
            developer: game.developer,
            characters: game.characters
          }
        });
      }))
      .subscribe((response) => { 
        this.games = response;
        this.gamesUpdated.next({ games: [...this.games]});
      });      
  }

  getGameById(gameId: string) {
    this.http.get<any>('https://shielded-hamlet-18741.herokuapp.com/api/games/' + gameId)
      .subscribe((response) => {
        this.game = response;
        this.gameUpdated.next({ game: {...this.game} })
      });
  }

  updateGame(gameId: string, formValue: any) {
    this.http.put<any>('https://shielded-hamlet-18741.herokuapp.com/api/games/' + gameId, formValue)
      .subscribe((response) => {
        this.router.navigate(['games-list']);
      });
  }

  deleteGame(gameId: string) {
    this.http.delete('https://shielded-hamlet-18741.herokuapp.com/api/games/' + gameId)
      .subscribe((response) => {
        this.getGames();
      });
  }
}
