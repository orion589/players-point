import { unionBy, maxBy } from 'lodash';
import { Action, createReducer, on } from '@ngrx/store';
import {
  PlayersFromStorage,
  DeletePlayer,
  UpScore,
  DownScore,
  AddPlayer,
} from '../actions/players.actions';
import { IPlayerState } from 'src/app/models/state.interface';
import { IPlayer } from 'src/app/models/player.interface';

export const initialState: IPlayerState = {
  players: [],
};

const playerReducer = createReducer(
  initialState,
  on(PlayersFromStorage, (state) => {
    const json = localStorage.getItem('players');
    const playersFromStorage = JSON.parse(json);
    return {
      ...state,
      players: playersFromStorage,
    };
  }),
  on(DeletePlayer, (state, { id }) => {
    return {
      ...state,
      players: state.players.filter((player: IPlayer) => player.id !== id),
    };
  }),
  on(UpScore, (state, { id }) => {
    const [player] = state.players.filter(
      (item: { id: number }) => item.id === id
    );
    const playerWithUpdatedScore = { ...player };
    playerWithUpdatedScore.score += 1;
    const newPlayers = unionBy([playerWithUpdatedScore], state.players, 'id');
    return {
      ...state,
      players: newPlayers,
    };
  }),
  on(DownScore, (state, { id }) => {
    const [player] = state.players.filter(
      (item: { id: number }) => item.id === id
    );
    const playerWithUpdatedScore = { ...player };
    playerWithUpdatedScore.score -= 1;
    const newPlayers = unionBy([playerWithUpdatedScore], state.players, 'id');
    return {
      ...state,
      players: newPlayers,
    };
  }),
  on(AddPlayer, (state, { player }) => {
    const newPlayer = { ...player };
    if (state.players.length === 0) {
      newPlayer.id = 1;
    } else {
      const lastPlayer = maxBy(state.players, (item: IPlayer) => item.id);
      newPlayer.id = lastPlayer.id + 1;
    }
    const newPlayers = state.players.concat([newPlayer]);
    return {
      ...state,
      players: newPlayers,
    };
  })
);

export function reducer(state: IPlayerState, action: Action) {
  return playerReducer(state, action);
}
