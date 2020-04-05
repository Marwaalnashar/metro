import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './components/book-component/book.component';
import { BookinglistComponent } from './components/booking-list-component/bookinglist/bookinglist.component';


const routes: Routes = [
  { path: 'book', component: BookComponent },
  { path: 'bookinglist', component: BookinglistComponent },
  { path: '', redirectTo: 'book', pathMatch: 'full' }
  // {
  //   path: 'book', 
  //   children: [
  //     { path: '', component: BookComponent },
  //     { path: 'edit/:id', component: BookComponent }
  //   ]
  // }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
