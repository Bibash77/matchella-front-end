import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../../_services';
import {LocalStorageUtil} from "../../core/utils/local-storage-util";
import {Account} from "../../_models";

@Component({ templateUrl: 'login.component.html' , styleUrls: ['login.component.scss']})
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.f.email.value, this.f.password.value)
            .subscribe({
                next: (responseToken) => {
                  console.log(this.route.snapshot.queryParams['returnUrl'] , "tst", responseToken);
                    // get return url from query parameters or default to home page
                  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                  // set token values
                  const storage = LocalStorageUtil.getStorage();
                  storage.email = responseToken.email;
                  storage.at = responseToken.access_token;
                  storage.rt = responseToken.refresh_token;
                  storage.ty = responseToken.token_type;
                  storage.username = responseToken.username;
                  let acc:Account = new Account();
                  acc.email = storage.email;
                  acc.id = responseToken.id;
                  acc.jwtToken = responseToken.access_token;
                  acc.username = responseToken.username;
                  this.accountService.setAccount = acc;


                  this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });

        this.accountService.login(this.f.email.value, this.f.password.value).subscribe(value => {
          console.log(value);
        })
    }

    setTokenValues() {

    }
}
