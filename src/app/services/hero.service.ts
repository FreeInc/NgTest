// @angular imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// rxjs library imports
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

// entities imports
import { Hero } from '../entities/hero';

// services imports
import { MessageService } from './message.service';

/** @param heroesUrl - argument url for http requests  */
const heroesUrl = 'api/heroes';

/** @param httpOptions - argument httpOptions for http requests  */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class HeroService {

  /**
   * Write log using MessageService
   * @param message - decription message
   */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(heroesUrl).pipe(
      tap(_ => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url).pipe(
      map(heroes => heroes[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** GET heroes whose name contains search term */
  searchHeroes(pattern: string): Observable<Hero[]> {
    // return empty Hero[] (if search pattern empty)
    if (!pattern.trim()) {
      return of([]);
    }
    // return Hero[] (which name matching to pattern)
    return this.http.get<Hero[]>(`api/heroes/?name=${pattern}`).pipe(
      tap(_ => this.log(`found heroes matching "${pattern}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`added hero with id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

}
