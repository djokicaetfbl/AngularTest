import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  private closeSub: Subscription; 

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if(this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(resData => {
      console.log("RES DATA: "+resData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    )
      form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    if(this.closeSub) {
        this.closeSub.unsubscribe();
    }
}

}
