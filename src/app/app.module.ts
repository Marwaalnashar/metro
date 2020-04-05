import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app-component/app.component';
import { BookComponent } from './components/book-component/book.component';
import { BookTicketsComponent } from './components/book-ticket-component/book-tickets.component';
import { BookService } from './services/book.service';
import { BookinglistComponent } from './components/booking-list-component/bookinglist/bookinglist.component';


@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookTicketsComponent,
    BookinglistComponent
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    ToastrModule.forRoot()
    
  ],
  entryComponents:[BookTicketsComponent],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
