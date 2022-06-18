import {Component, OnInit} from '@angular/core';

import { AccountService } from './_services';
import { Account, Role } from './_models';
import {LocalStorageUtil} from "@app/core/utils/local-storage-util";

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit{
    Role = Role;
    account: any;

    constructor(private accountService: AccountService) {
      const storage = LocalStorageUtil.getStorage();
      console.log(storage);
      this.accountService.account.subscribe(x =>{
        if(x == null && storage.userId != null) {
          let acc:Account = new Account();
          acc.email = storage.email;
          acc.id = storage.userId;
          acc.jwtToken = storage.at;
          acc.username = storage.username;
          acc.fullName = storage.fullName;
          LocalStorageUtil.setStorage(storage);
          this.accountService.setAccount = acc;
          this.account = acc;
        } else  {
          console.log(this.account);
          this.account =x;
        }
      });
    }

    logout() {
        this.accountService.logout();
    }

  ngOnInit(): void {
  }
}
