import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { BookTicket } from '../models/book-ticket.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  formData: Book;
  bookingTickets: BookTicket[];

  constructor(private http: HttpClient) { }


  storeOrUpdate() {
    var body = {

      ...this.formData,
      BookingTickets: this.bookingTickets
    };

    return this.http.post(environment.withUrl + '/Booking', body);
  }

  getBookingList() {
    
    return this.http.get(environment.withUrl + '/Booking').toPromise();
  }

}