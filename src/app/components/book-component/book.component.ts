import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookTicketsComponent } from '../book-ticket-component/book-tickets.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {

  ticketData;
  employeeList: Employee[];
  isValid: boolean = true;

  constructor(
    public service: BookService,
    private dialog: MatDialog,
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.resetForm();
    this.employeeService.getEmployeesList().then(res => this.employeeList = res as Employee[]);
  }


  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.service.formData = {
      BookingID: null,
      BookingNo: Math.floor(100000 + Math.random() * 900000).toString(),
      EmployeeID: 0,
      PMethod: "",
      GTotal: 0
    };
    this.service.bookingTickets = [];
  }

  openDialog(ticketIndex, BookingID): void {

    const dialogRef = this.dialog.open(BookTicketsComponent, {
      width: '500px',
      data: { ticketIndex, BookingID, ticketData: this.ticketData }
    });

    //callback function invoked when we close the dialog window,becuase we need to update GTotal when we edit the ticket
    dialogRef.afterClosed().subscribe(result => {
      this.updateGrandTotal();
    });
  }

  deleteTicket(bookingTicketID, i) {

    this.service.bookingTickets.splice(i, 1);
    this.updateGrandTotal();
  }

  updateGrandTotal() {
    // 0 is the itialize for prev.
    this.service.formData.GTotal = this.service.bookingTickets.reduce((prev, curr) => {
      return prev + curr.Total;
    }, 0);

    //this line used to 
    this.service.formData.GTotal = parseInt((this.service.formData.GTotal).toFixed(0));
  }

  validateForm() {

    if (this.service.formData.EmployeeID == 0) { this.isValid = false; }
    else if (this.service.bookingTickets.length == 0) { this.isValid = false; }
    return this.isValid;
  }

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.service.storeOrUpdate().subscribe(res => {
        this.resetForm();
        this.toastr.success('Submitted successfully', 'Metro Stations');
        this.router.navigate(['/bookinglist']);
      })
    }
  }

}
