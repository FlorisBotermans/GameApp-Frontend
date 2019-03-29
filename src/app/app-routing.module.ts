import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GamesListComponent } from './games/games-list/games-list.component';
import { LoginComponent } from './auth/login/login.component';
import { GamesCreateComponent } from './games/games-create/games-create.component';
import { GamesUpdateComponent } from './games/games-update/games-update.component';
import { GamesDetailComponent } from './games/games-detail/games-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/games-list', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  { path: 'games-create', component: GamesCreateComponent },
  { path: 'details/:gameId', component: GamesDetailComponent },
  { path: 'games-list', component: GamesListComponent },
  { path: 'games-update/:gameId', component: GamesUpdateComponent }
  // { path: '', component: GamesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
