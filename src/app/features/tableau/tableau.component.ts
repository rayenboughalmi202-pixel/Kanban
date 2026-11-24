import { Component, computed, signal } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

export interface Tache {
  id: number;
  titre: string;
  description: string;
  priorite: 'basse' | 'moyenne' | 'haute' | 'critique';
  statut: 'a-faire' | 'en-cours' | 'termine';
  echeance?: string;
}

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './tableau.component.html',
  styleUrl: './tableau.component.css',
})
export class TableauComponent {
  taches = signal<Tache[]>([
    { id: 1, titre: 'Créer le projet Angular', description: 'ng new + GitHub', priorite: 'haute', statut: 'termine' },
    { id: 2, titre: 'Installer le CDK', description: 'Pour le drag-drop', priorite: 'moyenne', statut: 'termine' },
    { id: 3, titre: 'Afficher les 3 colonnes', description: 'À faire, En cours, Terminé', priorite: 'haute', statut: 'en-cours' },
    { id: 4, titre: 'Ajouter le drag-drop', description: 'Déplacer les cartes entre colonnes', priorite: 'critique', statut: 'a-faire', echeance: '2026-11-30' },
    { id: 5, titre: 'Créer la directive appPriorite', description: 'Couleur selon la priorité', priorite: 'moyenne', statut: 'a-faire' },
  ]);

  aFaire = computed(() => this.taches().filter((t) => t.statut === 'a-faire'));
  enCours = computed(() => this.taches().filter((t) => t.statut === 'en-cours'));
  termine = computed(() => this.taches().filter((t) => t.statut === 'termine'));

  drop(event: CdkDragDrop<Tache[]>) {
    if (event.previousContainer === event.container) {
      return;
    }
    const tache = event.item.data as Tache;
    const nouveauStatut = event.container.id as Tache['statut'];
    this.taches.update((liste) =>
      liste.map((t) => (t.id === tache.id ? { ...t, statut: nouveauStatut } : t))
    );
  }
}
