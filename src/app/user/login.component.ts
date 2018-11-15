import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';

/* ngRx */
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;

  constructor(private authService: AuthService,
              private router: Router, private store: Store<any>) {
  }

  ngOnInit(): void {
    this.store.select('user').subscribe(userSlice => {
      if (userSlice) {
        this.maskUserName = userSlice.usernameMaskOn;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    // this.maskUserName = value;

    let actionType = value ? 'USER_NAME_MASK_ON': 'USER_NAME_MASK_OFF';

    this.store.dispatch({
      type: actionType
    });
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
