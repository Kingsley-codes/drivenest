// types/car.ts
export interface CarBase {
  _id: string;
  brand: string;
  model: string;
  year: number;
  carType: string;
  modelCategory: string;
  images?: string[];
}

export interface RentalCar extends CarBase {
  rentalPrice: number;
  isAvailable: boolean;
  forRent: true;
}

export interface SaleCar extends CarBase {
  salesPrice: number;
  inStock: boolean;
  forSale: true;
}

export type Car = RentalCar | SaleCar;
