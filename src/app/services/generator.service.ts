import { Injectable } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';
import { Grid } from '../model/grid.model';
import { Constants } from './constants';
import { MatrixService } from './matrix.service';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  private _grid$ = new BehaviorSubject<Grid>({
    matrix: new Array(),
    code: 0,
    nrOfCells: 0
  });

  public gridListener$ = this._grid$.asObservable();

  lastCharacter = ''
  isGridOn = false


  constructor(private matrix: MatrixService) { }

  init() {
    this.isGridOn = true
    this._grid$.next(this.matrix.generateNewMatrix(''))
    this.createTask(this, Constants.TIME_INTERVAL_MS)
    return this._grid$;
  }

  createTask(context: any, delayms: number) {
    (function loop() {
      if (!context._cancel) {
        context._grid$.next(context.matrix.generateNewMatrix(context.lastCharacter))
        setTimeout(loop, delayms);
      }
    })();
  }



}
