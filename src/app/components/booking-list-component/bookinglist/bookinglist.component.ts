import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-bookinglist',
  templateUrl: './bookinglist.component.html',
  styleUrls: ['./bookinglist.component.css']
})
export class BookinglistComponent implements OnInit {

  bookingList;

  constructor(private service: BookService) { }

  ngOnInit(): void {
    this.service.getBookingList().then(res => this.bookingList = res)


  }

}
