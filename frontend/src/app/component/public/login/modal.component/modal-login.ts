import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { SessionService } from 'app/service/session.service';

import {User} from '../../../../model/user.model';

@Component({
  selector: 'modal-login',
  templateUrl: 'modal-login.html',
  styles: [`
    .hide{display: none}`]
  ,
  animations: [
    trigger('dialog', [
      transition('void => *', [
        animate(100, style({ transform: 'scale3d(.3, .3, .3)' }))
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class ModalLogin {
  // - attributes
  visible: boolean;
  user: User;

  // ------------------------------------------------------------------------------------------------------------------
  constructor(private sessionService: SessionService, private router: Router) {
    this.visible = false;
  }

  // ------------------------------------------------------------------------------------------------------------------

  logIn(username: string, password: string) {

    this.sessionService.logIn(username, password).subscribe(
      () => {
        this.close();
        this.router.navigate(['']);
      },
      error => {
        console.log(error);
        console.log('fail');

        this.close();
      }
    );
  }

  // ------------------------------------------------------------------------------------------------------------------

  close(): void {
    this.visible = false;
  }

  open(): void {
    if (!this.visible)
      this.visible = true;
  }
}
