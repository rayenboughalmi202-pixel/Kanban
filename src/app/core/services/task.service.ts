import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { Tache, Statut } from '../models/tache.model';
@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/tasks';
  getTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.url).pipe(catchError(err => throwError(() => err)));
  }
  getTache(id: number): Observable<Tache> { return this.http.get<Tache>(`${this.url}/${id}`); }
  // Rule 1 (§2.3): a 'critique' task must have a deadline (echeance).
  ajouterTache(tache: Omit<Tache, 'id'>): Observable<Tache> {
    if (tache.priorite === 'critique' && !tache.echeance) {
      return throwError(() => new Error('Une tâche critique doit avoir une échéance'));
    }
    return this.http.post<Tache>(this.url, tache);
  }
  // Rule 2 (§2.3): a 'termine' task cannot change priority.
  // Rule 1 again: changing a task to 'critique' needs a deadline.
  modifierTache(id: number, tache: Partial<Tache>): Observable<Tache> {
    if (!tache.priorite) {
      return this.http.patch<Tache>(`${this.url}/${id}`, tache);
    }
    return this.getTache(id).pipe(
      switchMap(current => {
        if (current.statut === 'termine' && tache.priorite !== current.priorite) {
          return throwError(() => new Error('Une tâche terminée ne peut plus changer de priorité'));
        }
        const echeance = tache.echeance ?? current.echeance;
        if (tache.priorite === 'critique' && !echeance) {
          return throwError(() => new Error('Une tâche critique doit avoir une échéance'));
        }
        return this.http.patch<Tache>(`${this.url}/${id}`, tache);
      })
    );
  }
  changerStatut(id: number, statut: Statut): Observable<Tache> { return this.modifierTache(id, { statut }); }
  supprimerTache(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
      }
