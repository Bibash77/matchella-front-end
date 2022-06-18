import {Component, OnInit} from '@angular/core';

import { AccountService } from '@app/_services';
import {CardCreateService} from "@app/card-creation/card-create.service";

@Component({ templateUrl: 'home.component.html' , styleUrls: ['home.component.scss']})
export class HomeComponent implements OnInit{
  options = ['Java Developer' , 'Movie Night' , 'Goa Trip']
    account = this.accountService.accountValue;
  data = [];

    constructor(private accountService: AccountService, private cardService:CardCreateService) { }

  ngOnInit(): void {
      this.cardService.getAllCard().subscribe((value: any) => {
        this.data = value;
        console.log(value);
      });
  }
}
