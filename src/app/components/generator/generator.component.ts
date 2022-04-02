import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { Grid } from 'src/app/model/grid.model';
import { Constants } from 'src/app/services/constants';
import { GeneratorService } from 'src/app/services/generator.service';

@Component({
  selector: 'generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit, OnDestroy {
  grid!: Grid;
  nextCharacter: string = '';
  formdados: FormGroup;
  formCtrlSub!: Subscription;

  get matrix(): Array<Array<string>> {
    return this.grid?.matrix;
  }
  subscription!: Subscription;

  get width(): number {
    return Constants.WIDTH
  }

  get height(): number {
    return Constants.HEIGHT
  }

  constructor(private _genService: GeneratorService, private _formBuilder: FormBuilder) {
    this.formdados = this._formBuilder.group({
      character: ['', [Validators.required, Validators.maxLength(1), Validators.pattern('^[A-Za-z]+$')]],
    });
  }

  ngOnInit() {
    this.bindOnChangeForm();
    if (this._genService.isGridOn) {
      this.subscription = this._genService.gridListener$.subscribe((grid) => {
        this.grid = grid;
      })
    }
  }

  bindOnChangeForm() {
    //trim input, debounce 4s
    this.formCtrlSub = this.formdados.valueChanges
      .pipe(
        debounceTime(4000),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      )
      .subscribe(value => {
        this._genService.lastCharacter = value?.character as string
      });
  }

  generateGrid() {
    this._genService.init()
    this.subscription = this._genService.gridListener$.subscribe((grid) => {
      this.grid = grid;
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
    this.formCtrlSub?.unsubscribe()
  }
}
