import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

import { Person } from '@app/shared/models/person';

import { PersonService } from '@app/shared/services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html'
})
export class PersonListComponent implements OnInit {

  modalRef?: BsModalRef;

  name = 'Pessoa';

  persons: Person[] = [];
  personSelect = {} as Person;

  constructor(
    private router: Router,
    private service: PersonService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getPersons();
  }

  getPersons(): void {
    this.service.getPersons().subscribe(
      (persons: Person[]) => this.persons = persons,
      (err: any) => this.error(err, 'Ocorreu um erro ao carregar os dados dos clientes.')
    ).add(() => this.spinner.hide());
  }

  edit(id: number): void {
    if (id) this.router.navigate([`/person-form/${id}`]);
  }

  delete(): void {

    this.modalRef?.hide();
    this.spinner.show();

    this.service.delete(this.personSelect).subscribe(
      () => {
        const index = this.persons.indexOf( this.personSelect );
        this.persons.splice(index, 1);

        this.toastr.toastrConfig.disableTimeOut = false;
        this.toastr.success(this.name + ' deletada.');
      },
      (err: any) => this.error(err, 'Ocorreu um erro ao deletar a pessoa.'),
    ).add(() => this.spinner.hide());
  }

  openModal(event: any, person: Person, template: TemplateRef<any>): void {
    event.stopPropagation();

    this.personSelect = person;

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef?.hide();
  }

  private error(err?: any, msg?: string): void {
    console.log(err);

    this.toastr.toastrConfig.disableTimeOut = true;

    (err.error.error)
        ? this.toastr.error(err.error.error, 'Erro!')
        : this.toastr.error(msg, 'Erro!');
  }

}
