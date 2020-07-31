import {  
  ReactiveFormsModule,  
  NG_VALIDATORS,  
  FormsModule,  
  FormGroup,  
  FormControl,  
  ValidatorFn,  
  Validator  
 } from '@angular/forms';  
 import { Directive } from '@angular/core';  
 @Directive({  
  selector: '[appUrlValidator][ngModel]',  
  providers: [  
   {  
    provide: NG_VALIDATORS,  
    useExisting: UrlValidatorDirective,  
    multi: true  
   }  
  ]  
 })  
 export class UrlValidatorDirective implements Validator {  
  validator: ValidatorFn;  
  constructor() {  
   this.validator = this.urlValidator();  
  }  
  validate(c: FormControl) {  
   return this.validator(c);  
  }  
 
  urlValidator(): ValidatorFn {  
   return (c: FormControl) => {  
    if(c.value) {
      if (!c.value.startsWith('https') || !c.value.startsWith('http')) {
        return { validUrl: true };
      } else if(c.value.split('.').pop()) {
        const ext = c.value.split('.').pop();
        if (ext === 'jpg' || ext === 'JPG' || ext === 'png' || ext === 'PNG' || ext === 'JPEG' || ext === 'jpeg') {
          return null;
        } else {
          return { validExtensionUrl: true };
        }
      }
      return null;
    }
   }  
  }  
 }