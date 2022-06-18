import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Account} from "../_models";
import {Card} from "../_models/Card";
const baseUrl = `${environment.apiUrl}/card`;
@Injectable({
  providedIn: 'root'
})

export class CardCreateService {

  constructor(private http: HttpClient) { }


  register(card: Card) {
    return this.http.post(`${baseUrl}`, card);
  }

  getAllCard(){
    return this.http.get(`${baseUrl}`);
  }
}
