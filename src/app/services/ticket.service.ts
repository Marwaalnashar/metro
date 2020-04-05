import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http:HttpClient) { }


getTicketsList()
{
  return this.http.get(environment.withUrl+'/Ticket').toPromise();
}

}
