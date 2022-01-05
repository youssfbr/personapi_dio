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
    note: [''],
  });

  constructor(
    private service: PersonService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: FormGroup): void {

    form.value.cpf = form.value.cpf.replace(/\.|-/gm,'');
    this.person = Object.assign({}, this.person, this.form.value);

    this.service.persist(this.person).subscribe({
      next: (person: Person) => {
        console.log(person);
      },
      error: (err: any) => { console.log(err);
      }
    });


    console.log(this.person);
  }

}
