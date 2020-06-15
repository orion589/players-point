import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPlayer } from '../../models/player.interface';

import { Store, select } from '@ngrx/store';
import {
  PlayersFromStorage,
  DeletePlayer,
  UpScore,
  DownScore,
} from '../../store/actions/players.actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IPlayerState } from 'src/app/models/state.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'score', 'actions'];
  playerData = [];
  dataSource = new MatTableDataSource(this.playerData);
  playerList$: Observable<IPlayer[]>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public defaultSort: Sort = { active: 'id', direction: 'asc' };
  constructor(private store: Store<IPlayerState>) {
    this.playerList$ = store.pipe(
      select('players'),
      tap((data) => (this.playerData = data))
    );
    this.dataSource = new MatTableDataSource(this.playerData);
  }

  ngOnInit(): void {
    if (localStorage.getItem('players')) {
      this.store.dispatch(PlayersFromStorage());
    }
    this.store.pipe(select('players')).subscribe((total) => {
      console.log(typeof total, 'total: ', total);

      if (!total.players) {
        total.players = [];
      }
      this.dataSource = new MatTableDataSource(total.players);
      this.dataSource.sort = this.sort;
      const json = JSON.stringify(total.players);
      localStorage.setItem('players', json);
    });
  }

  upScore(id: number): void {
    this.store.dispatch(UpScore({ id }));
  }
  downScore(id: number): void {
    this.store.dispatch(DownScore({ id }));
  }
  deletePlayer(id: number): void {
    this.store.dispatch(DeletePlayer({ id }));
  }
}
