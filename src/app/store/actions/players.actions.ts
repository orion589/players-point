import { createAction, props } from '@ngrx/store';

import { IPlayer } from '../../models/player.interface';

export enum EPlayerActions {
  DeletePlayer = '[Player] Delete Player',
  UpScore = '[Player] UP Score',
  DownScore = '[Player] Down Score',
  AddPlayer = '[Player] Add Player',
  PlayersFromStorage = '[Players] from LocalStorage',
}

export const PlayersFromStorage = createAction(
  EPlayerActions.PlayersFromStorage
);

export const DeletePlayer = createAction(
  EPlayerActions.DeletePlayer,
  props<{ id: number }>()
);

export const UpScore = createAction(
  EPlayerActions.UpScore,
  props<{ id: number }>()
);

export const DownScore = createAction(
  EPlayerActions.DownScore,
  props<{ id: number }>()
);

export const AddPlayer = createAction(
  EPlayerActions.AddPlayer,
  props<{ player: IPlayer }>()
);
