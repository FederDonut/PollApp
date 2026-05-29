import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  checkAnswer(): FormControl {
    return new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    });
  }
  checkQuestion(): FormControl {
    return new FormControl('', {
      validators: [Validators.required, Validators.minLength(12)],
    });
  }
  checkSurvey(): FormControl {
    return new FormControl('', {
      validators: [Validators.required],
    });
  }
}
