import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  checkAnswer(): FormControl {
    const answer = new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    });
    answer.valueChanges.subscribe(() => {
      console.log('Feld gültig: ', answer.valid);
      console.log('mindestlänge von 6: ', answer.errors);
    });
    return answer;
  }
  checkHeadline(): FormControl {
    const question = new FormControl('', {
      validators: [Validators.required, Validators.minLength(12)],
    });
    return question;
  }
}
