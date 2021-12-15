import { Injectable } from '@angular/core';
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {


  static getConfirmationErrorMessage(validatorName: string, validatorValue?: any) {
    var config: any = {
      required: 'est requis',
      noCorrespondance: "Les mots de passes ne correspondent pas",
    };

    return config[validatorName];
  }


  static passwordsConfirm(control: FormControl) {
    var password = control.get("password");
    var confirmation = control.get("confirm_password");
    if (password?.value !== confirmation?.value) {
      password?.setErrors({ noCorrespondance: true });
      confirmation?.setErrors({ noCorrespondance: true });
      return { noCorrespondance: true };
    }
    else if (password?.value.trim() === "" || confirmation?.value.trim() === "") {
      return { required: true };
    }
    else {
      password?.setErrors(null);
      confirmation?.setErrors(null);
      return null;
    }
  }
}
