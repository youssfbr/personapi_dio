import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControlName, FormArray, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

import { fromEvent, merge, Observable } from 'rxjs';

import { MASKS, NgBrazilValidators } from 'ng-brazil';

import { DisplayMessage, GenericValidator, ValidationMessages } from '@app/shared/utils/generic-form-validation';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { Person } from '@app/shared/models/person';
import { Phone } from '@app/shared/models/phone';

import { PersonService } from '@app/shared/services/person.service';
import * as moment from 'moment';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html'
})
export class PersonFormComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements?: ElementRef[];

  modalRef?: BsModalRef;

  MASKS = MASKS;
  dateMask = [/[0-9]/, /[0-9]/, '/',/[0-9]/, /[0-9]/,'/', /\d/, /\d/, /\d/, /\d/];
  phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/ , /\d/ , /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  name = 'Pessoa';
  subtitle = 'Cadastro'
  addTitlePhone = false;

  person = {} as Person;
  personId: number = 0;

  indexPhone: number = 0;
  idPhone: number = 0;
  numberPhone: string = '';
  addMsgPhone = false;
  removeMsgPhone = false;

  

  get phones(): FormArray {
    return this.form.get('phones') as FormArray;
  }

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
      invalidDate: 'Data de aniversário inválida'
    }
  };

  public cssValidator(fieldForm: FormControl | AbstractControl | null): any {
    return {'is-invalid': fieldForm?.errors && (fieldForm?.dirty || fieldForm?.touched)};
  }

  form: FormGroup = this.fb.group({
    id: [{ value: '', disabled: true }],
    registerDate: [{ value: '', disabled: true }],
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    cpf: ['', [Validators.required, <any>NgBrazilValidators.cpf]],
    birthDate: [null, [ this.isValidDate]],
    note: [''],
    phones: this.fb.array([])
  });

  addPhone(): void {
    this.addTitlePhone = true;
    this.addMsgPhone = true;
    this.removeMsgPhone = false;
    this.phones.push(this.createPhone({} as Phone));
  }

  createPhone(phone: Phone): FormGroup{
    return this.fb.group({
      id: [phone.id, { value: '', disabled: true }],
      type: [phone.type, Validators.required],
      number: [phone.number, Validators.required]
    });
  }

  private loadPersons(): void {

    this.personId = +this.activatedRoute.snapshot.paramMap.get('id')!;

    if (this.personId && this.personId !== null && this.personId > 0) {

      this.spinner.show();
      this.subtitle = 'Atualizar';

      this.service.getPersonById(this.personId).subscribe(

        (personRes: Person) => {
          this.person = { ... personRes }
          this.form.patchValue(this.person);

          this.phones.reset();

          this.person.phones.forEach(phone =>
            this.phones.push(this.createPhone(phone))
          );
        },
        (err: any) => this.error(err, 'Ocorreu um erro ao carregar os dados!')
      ).add(() => this.spinner.hide());
    }
  }

  constructor(
    private service: PersonService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.form.addControl('birthDate', new FormControl('', null));
    this.loadPersons();
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements!
     .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.form);
    });
  }

  onSubmit(form: FormGroup, navigate = true): void {

    this.spinner.show();

    if (form.dirty && form.valid) {

      form.value.cpf = form.value.cpf.replace(/\.|-/gm,'');

      if (form.controls['birthDate'].value === "") {
        form.patchValue({ birthDate : null});
      }

      this.person = Object.assign({}, this.person, this.form.value);

      this.service.persist(this.person).subscribe(

        (personResponse: Person) => {

          this.toastr.clear();
          this.toastr.toastrConfig.disableTimeOut = false;
          if (this.addMsgPhone) this.toastr.success('Número de telefone adicionado.')
          this.person.id
          ? this.toastr.success(this.name + ' atualizada.')
          : this.toastr.success(this.name + ' salva.');

          this.toastr.toastrConfig.disableTimeOut = true;
          if (this.removeMsgPhone) this.toastr.success(`Número de telefone ${this.numberPhone} removido.`);

          this.person = Object.assign({}, this.person, personResponse);

          if (navigate) this.router.navigate(['/person-list']);
        },
        (err: any) => this.error(err, 'Ocorreu um erro ao salvar/atualizar!')
      ).add(() => this.spinner.hide());
    }
  }

  RemovePhone(template: TemplateRef<any>, index: number): void {

    this.indexPhone = index;
    this.idPhone = this.phones.get(index+'.id')?.value;
    this.numberPhone = this.phones.get(index+'.number')?.value;

    this.addTitlePhone = false;

    if (this.idPhone) {
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }
    else {
      this.phones.removeAt(index);
    }
  }

  confirmDeleteTelefone(index: number): void {

    this.modalRef?.hide();
    this.spinner.show();

    this.phones.removeAt(index);

    this.form.controls['phones'].markAsDirty();

    this.addMsgPhone = false;
    this.removeMsgPhone = true;

    this.onSubmit(this.form, false);

    this.spinner.hide();
  }

  decline(): void {
    this.modalRef?.hide();
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

  private isValidDate(c: FormControl): ValidationErrors {

    let result!: ValidationErrors;

    let isValid = true;

    if (c.value) {
       isValid = moment(c.value, 'DD/MM/YYYY').isValid();
    }

    if (!isValid) {
      if (isValid !== null) {
        result = { invalidDate: 'Invalid date' };
     }
    }

    return result;
  }
}
