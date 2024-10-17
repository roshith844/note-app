import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomErrorHandlerService implements ErrorHandler {
  handleError(error: unknown): void {
    console.warn('something Went Wrong');
  }
}
