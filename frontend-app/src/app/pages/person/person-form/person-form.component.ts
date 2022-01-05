import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Person } from '@app/shared/models/person';

import { PersonService } from '@app/shared/services/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  name = 'Cliente';

  person = {} as Person;
  personId: number = 0;

  form: FormGroup = this.fb.group({
    id: [{ value: '', disabled: true }],
    registerDate: [{ value: '', disabled: true }],
    firstName: [''],
    lastName: [''],
    cpf: [''],
    birthDate: [''],
  });

  constructor(
    private service: PersonService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: FormGroup): void {
    console.log(form.value);
  }

}
