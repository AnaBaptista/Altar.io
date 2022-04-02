import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Payment, PaymentRequest } from '../model/payment.model';
import { Observable, of } from 'rxjs';

const httpOptions = { //needed for POST on JSON Server
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PaymentsCRUDService {

  constructor(private _http: HttpClient) { }

  getPayments(): Observable<Payment[]> {
    return this._http.get<Payment[]>('/api/payments');
  }

  getPayment(id: number): Observable<Payment> {
    return this._http.get<Payment>(`/api/payments/${id}`);
  }

  postPayment(newPayment: Payment): Observable<string> {
    return this._http.post<string>('api/payments', newPayment);
  }

  deletePayment(id: number): Observable<string> {
    return this._http.delete<string>(`/api/payments/${id}`);
  }



}
