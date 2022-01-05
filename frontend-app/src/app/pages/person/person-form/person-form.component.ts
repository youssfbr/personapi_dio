import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';

import { fromEvent, merge, Observable } from 'rxjs';

import { DisplayMessage, GenericValidator, ValidationMessages } from '@app/shared/utils/generic-form-validation';

import { ToastrService } from 'ngx-toastr';

import { Person } from '@app/shared/models/person';

import { PersonService } from '@app/shared/services/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements?: ElementRef[];

  name = 'Pessoa';

  person = {} as Person;
  personId: number = 0;

  private genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  validationMessages: ValidationMessages =
  {
    firstName: {
      required: 'O nome é requerido.',
      minlength: 'O Nome precisa ter no mínimo 2 caracteres.',
      maxlength: 'O Nome precisa ter no máximo 20 caracteres.'
    },
    lastName: {
      required: 'O sobrenome é requerido.',
      minlength: 'O Nome precisa ter no mínimo 2 caracteres.',
      maxlength: 'O Nome precisa ter no máximo 20 caracteres.'
    },
    cpf: {
      required: 'Preencha o campo CPF.',
      cpf: 'CPF inválido.'
    },
    birthDate: {
      date: 'Data inválida.'
    },
  };

  form: FormGroup = this.fb.group({
    id: [{ value: '', disabled: true }],
    registerDate: [{ value: '', disabled: true }],
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    cpf: ['', [Validators.required]], // TODO: NgBrazilValidators.cpf
    birthDate: [''], // TODO: CustomValidators.date
    note: [''],
  });

  constructor(
    private service: PersonService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements!
     .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.form);
    });
  }

  onSubmit(form: FormGroup): void {

    if (form.dirty && form.valid) {

      form.value.cpf = form.value.cpf.replace(/\.|-/gm,'');
      this.person = Object.assign({}, this.person, this.form.value);

      this.service.persist(this.person).subscribe({
        next: (personResponse: Person) => {

          this.toastr.clear();

          this.toastr.toastrConfig.disableTimeOut = false;
          this.toastr.success(this.name + ' salva/atualizada');

          this.person = Object.assign({}, this.person, personResponse);

          this.router.navigate(['/person-list']);
        },
        error: (err: any) => this.error(err, 'Ocorreu um erro ao salvar/atualizar!')
      });
    }
  }

  private error(err?: any, msg?: string): void {

    console.log(err);

    this.toastr.clear();
    this.toastr.toastrConfig.disableTimeOut = true;

    (err.error.erros)
        ? err.error.erros.forEach((errors?: any) => {
          this.toastr.error(errors, 'Erro!')
        })
        : this.toastr.error(msg, 'Erro!');
  }

}
