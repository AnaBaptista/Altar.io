import { Grid } from "./grid.model";

export declare interface Payment {
  id: number;
  grid: Grid;
  name: string;
  amount: number;
}

export declare interface PaymentRequest {
  grid: Grid;
  name: string;
  amount: number;
}
