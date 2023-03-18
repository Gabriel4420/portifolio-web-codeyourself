import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import Contact from '../models/contact'

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  apiUrl = 'https://localhost:7112/contacts'
  constructor(private http: HttpClient) {}

  addContact(contact: Contact) {
    return this.http.post(this.apiUrl, contact)
  }
}
