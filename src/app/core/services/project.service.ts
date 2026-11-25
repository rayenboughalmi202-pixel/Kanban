import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, throwError } from 'rxjs';
import { Projet } from '../models/projet.model';
import { Tache } from '../models/tache.model';
@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/projects';
  getProjets(): Observable<Projet[]> { return this.http.get<Projet[]>(this.url); }
  ajouterProjet(projet: Omit<Projet, 'id'>): Observable<Projet> { return this.http.post<Projet>(this.url, projet); }
  // Règle du sujet : un projet ne peut être supprimé que s'il ne contient aucune tâche active.
  // Active = une tâche de CE projet dont le statut n'est pas 'termine'.
  supprimerProjet(id: number): Observable<void> {
    return this.http.get<Tache[]>('http://localhost:3000/tasks').pipe(
      map(taches => taches.some(t => t.projetId === id && t.statut !== 'termine')),
      switchMap(aUneTacheActive => aUneTacheActive
        ? throwError(() => new Error('Projet non supprimable : il contient des tâches actives'))
        : this.http.delete<void>(`${this.url}/${id}`))
    );
  }
}
