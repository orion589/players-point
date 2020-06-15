import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddPlayer } from '../../store/actions/players.actions';
import { IPlayer } from 'src/app/models/player.interface';
import { IPlayerState } from 'src/app/models/state.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  newPlayer = '';
  constructor(private store: Store<IPlayerState>) {}
  addNewPlayer() {
    const player: IPlayer = {
      id: 1,
      name: this.newPlayer,
      score: 0,
    };
    this.store.dispatch(AddPlayer({ player }));
    this.newPlayer = '';
  }
}
