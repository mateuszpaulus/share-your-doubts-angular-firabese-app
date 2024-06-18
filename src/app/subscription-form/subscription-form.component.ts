import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Sub} from "../models/sub";
import {SubscribersService} from "../services/subscribers.service";

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.css'
})
export class SubscriptionFormComponent {

  isEmailInUse: boolean = false;
  isSubscribed: boolean = false;

  constructor(
    private subscribersService: SubscribersService,
  ) {
  }

  onSubmit(formValue: Sub) {
    this.subscribersService.checkSubs(formValue.email).subscribe(data => {

      if (data) {
        this.subscribersService.addSubs(formValue);
        this.isSubscribed = true;
        this.isEmailInUse = false;
        return
      }
      this.isEmailInUse = true;
    })
  }
}
