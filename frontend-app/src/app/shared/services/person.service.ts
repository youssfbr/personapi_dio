import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Person } from './../models/person';

import { environment } from 'src/environments/environment';

@Injectable()
export class PersonService {

  apiUrl: string = environment.apiURLBase + '/api/v1/peoples';

  constructor(private http: HttpClient) { }

  getPersons(): Observable<Person[]> {
    return this.http
      .get<Person[]>(this.apiUrl)
      .pipe(take(1));
  }

  getPersonById(id: number): Observable<Person> {
    return this.http
      .get<Person>(`${this.apiUrl}/${id}`)
      .pipe(take(1));
  }

  persist(person: Person): Observable<Person> {
    return person.id
      ? this.http.put<Person>(`${this.apiUrl}/${person.id}`, person).pipe(take(1))
      : this.http.post<Person>(this.apiUrl, person).pipe(take(1));
  }

  delete(person: Person): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/${person.id}`)
      .pipe(take(1));
  }

}
