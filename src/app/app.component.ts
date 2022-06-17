import { Component } from '@angular/core';

import { AccountService } from './_services';
import { Account, Role } from './_models';
import {LocalStorageUtil} from "@app/core/utils/local-storage-util";

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    Role = Role;
    account = LocalStorageUtil.getStorage();

    constructor(private accountService: AccountService) {
        this.accountService.account.subscribe(x => console.log(x));
    }

    logout() {
        this.accountService.logout();
    }
}
