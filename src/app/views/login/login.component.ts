import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { HooksWatcher } from 'src/app/models/hooks-watcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends HooksWatcher implements OnInit {

  public email: FormControl = new FormControl('tomas.vzor@totojedemo.sk')
  public password: FormControl = new FormControl();

  constructor(private router: Router, private session: SessionService) {
    super();
  }

  ngOnInit(): void {
  }

  public submit(): void {
    this.session.attemptLogin(this.email.value, this.password.value)
      .pipe(this.takeUntilDestroyed())
      .subscribe(() => {
        this.router.navigateByUrl('/feeds');
      });
  }

}
