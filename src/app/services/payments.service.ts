import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, from, last, map, Observable, of, tap } from 'rxjs';
import { PaymentsCRUDService } from './payments-crud.service';
import { Payment, PaymentRequest } from '../model/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  constructor(private _crudService: PaymentsCRUDService) {
    this.getAllPayments();
  }

  private _lastPayments$!: Observable<Payment[]>;

  get lastPayments(): Observable<Payment[]> {
    return this._lastPayments$;
  }
  nextAvailableId!: number;

  getAllPayments(): Observable<Payment[]> {
    this._lastPayments$ = this._crudService.getPayments();
    this._lastPayments$.subscribe(
      payments =>
        this.nextAvailableId = payments[length - 1].id + 1
    )
    return this._lastPayments$;
  }

  getPaymentById(id: number): Observable<Payment> {
    return this._crudService.getPayment(id);

  }

  insertNewPayment(newPayment: PaymentRequest) {

    this._crudService.postPayment({ id: this.nextAvailableId, ...newPayment }).subscribe(
      {
        next: () => {
          this.getAllPayments()
        },
        error: () => {
          // show error message in toastr or similar
        },
        complete: () => {
          //clear blocking flags
        }
      }
    )
  }

  deletePayment(id: number) {
    this._crudService.deletePayment(id).subscribe(
      {
        next: () => {
          this.getAllPayments()
        },
        error: () => {
          // show error message in toastr or similar
        },
        complete: () => {
          //clear blocking flags
        }
      }
    )
  }


}
