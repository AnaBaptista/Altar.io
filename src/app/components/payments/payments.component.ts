import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Grid } from 'src/app/model/grid.model';
import { Payment, PaymentRequest } from 'src/app/model/payment.model';
import { Constants } from 'src/app/services/constants';
import { GeneratorService } from 'src/app/services/generator.service';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  currentGrid!: Grid;
  formPayment: FormGroup;
  isGridOn!: boolean;
  private gridSubscription!: Subscription;

  get payments$(): Observable<Payment[]> {
    return this._paymentsService.lastPayments
  }

  get matrix(): Array<Array<string>> {
    return this.currentGrid?.matrix;
  }

  get width(): number {
    return Constants.WIDTH
  }

  get height(): number {
    return Constants.HEIGHT
  }

  headers: string[] = ['Name', 'Amount', 'Code', 'Grid', 'Actions']

  constructor(private _genService: GeneratorService,
    private _formBuilder: FormBuilder,
    private _paymentsService: PaymentsService) {
    this.isGridOn = this._genService.isGridOn
    this.formPayment = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      amount: [0, [Validators.required, Validators.min(0), Validators.max(999999)]]
    });
  }

  ngOnInit(): void {
    this.gridSubscription = this._genService.gridListener$.subscribe((grid) => {
      this.currentGrid = grid;
    })
  }

  startGeneratingGrid() {
    this._genService.init()
    this.isGridOn = this._genService.isGridOn
    this.gridSubscription = this._genService.gridListener$.subscribe((grid) => {
      this.currentGrid = grid;
    })
  }

  onSubmit() {
    if (this.formPayment.valid) {
      let newPayment: PaymentRequest = {
        grid: {
          matrix: this.currentGrid.matrix,
          code: this.currentGrid.code,
          nrOfCells: this.currentGrid.nrOfCells
        },
        name: this.formPayment.get('name')?.value as string,
        amount: this.formPayment.get('amount')?.value as number,
      }

      this._paymentsService.insertNewPayment(newPayment);
    }
  }

  deletePayment(id: number) {
    this._paymentsService.deletePayment(id)
  }

  ngOnDestroy(): void {
    this.gridSubscription?.unsubscribe();
  }
}
