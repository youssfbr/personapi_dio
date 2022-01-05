import { FormGroup } from "@angular/forms";

export class GenericValidator {
  constructor(private validationMessages: ValidationMessages) {}// { [key: string]: { [key: string]: string } } = VALIDATION_MESSAGES) {}

  // this will process each formcontrol in the form group // and then return the error message to display // the return value will be in this format `formControlName: 'error message'`;
  processMessages(container: FormGroup): { [key: string]: string } {
    const messages: any = {};

    // loop through all the formControls
    for (const controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        // get the properties of each formControl
        const controlProperty = container.controls[controlKey];
        // If it is a FormGroup, process its child controls.
        if (controlProperty instanceof FormGroup) {
          const childMessages = this.processMessages(controlProperty);
          Object.assign(messages, childMessages);
        } else {
          // Only validate if there are validation messages for the control
          if (this.validationMessages[controlKey]) {
            messages[controlKey] = '';
            if ((controlProperty.dirty || controlProperty.touched) && controlProperty.errors) {
              // loop through the object of errors
              Object.keys(controlProperty.errors).map(messageKey => {
                if (this.validationMessages[controlKey][messageKey]) {
                  messages[controlKey] += this.validationMessages[controlKey][messageKey] + ' ';
                }
              });
            }
          }
        }
      }
    }
    return messages;
  }
  }

  export interface DisplayMessage {
    [key: string]: string
  }
  export interface ValidationMessages {
    [key: string]: { [key: string]: string}
  }


