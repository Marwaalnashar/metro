import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookTicket } from 'src/app/models/book-ticket.model';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/app/models/ticket.model';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';


export interface DialogData {
  ticketData: string;
}

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.css']
})
export class BookTicketsComponent implements OnInit {

  formData: BookTicket;
  ticketList: Ticket[];
  isValid: boolean = true;

  constructor(
    private ticketService: TicketService,
    public dialogRef: MatDialogRef<BookTicketsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookService: BookService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    
    //to get data from sql
    this.ticketService.getTicketsList().then(res => this.ticketList = res as Ticket[]);
    //used this check when we need to edit ticket
    if (this.data.ticketIndex == null) {
      this.formData = {

        BookingTicketID: null,
        BookingID: this.data.BookingID,
        TicketID: 0,
        Direction: '',
        Price: 0,
        Quantity: 0,
        Total: 0
      }
    }
    else {
      //to assign the corresponding data to fields
      this.formData = Object.assign({}, this.bookService.bookingTickets[this.data.ticketIndex]);
    }
  }

  updatePrice(ctrl) {

    if (ctrl.selectedIndex == 0) {
      this.formData.Price = 0;
    }
    else {
      this.formData.Price = this.ticketList[ctrl.selectedIndex - 1].Price;
    }
    //because if i change the type of ticket must also change the price.
    this.updateTotal();

  }

  updateTotal() {

    this.formData.Total = parseInt((this.formData.Quantity * this.formData.Price).toFixed(0));

  }
  onSubmit(form: NgForm) {
    //check first if value of form are selected or not
    if (this.validateForm(form.value)) {
      //check if the user need to add or edit ticket
      if (this.data.ticketIndex == null) {
        //store values in bookTicket model
        this.bookService.bookingTickets.push(form.value);
      }
      else {
        this.bookService.bookingTickets[this.data.ticketIndex] = form.value;
        //after enter submit close the form
      }
      this.dialogRef.close();
    }
  }

  validateForm(formData: BookTicket) {

    //check if values of form are selected or not
    if (formData.TicketID == 0) { this.isValid = false; }
    else if (formData.Quantity == 0) { this.isValid = false; }
    return this.isValid;

  }
}
