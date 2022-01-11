import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PersonRoutingModule } from './person-routing.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SharedComponentsModule } from '@app/shared/components/shared-components.module';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { TextMaskModule } from '@myndmanagement/text-mask';
import { NgBrazil } from 'ng-brazil';
import { CustomFormsModule } from 'ng2-validation'

import { PersonListComponent } from './person-list/person-list.component';
import { PersonFormComponent } from './person-form/person-form.component';

import { InstantFormatPipe } from '@app/shared/helpers/InstantFormat.pipe';


@NgModule({
  declarations: [
    PersonListComponent,
    PersonFormComponent,
    InstantFormatPipe
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    NgBrazil,
    CustomFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    NgxSpinnerModule,
    SharedComponentsModule
  ],
  exports: [
    PersonListComponent,
    PersonFormComponent
  ]
})
export class PersonModule { }
