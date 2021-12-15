import {Component, Input, OnInit} from '@angular/core';
import {ConfirmService} from "../../confirm.service";

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  error: string = '';
  @Input() control: any;

  constructor() { }

  ngOnInit(): void {
  }


  get errorMessages() {
    for (let propertyName in this.control?.errors) {
      console.log(propertyName);
      if (this.control?.errors.hasOwnProperty(propertyName) && this.control?.touched) {
        return ConfirmService.getConfirmationErrorMessage(propertyName, this.control?.errors[propertyName]);
      }
    }
    return null;
  }
}
