import { Component, computed, signal } from '@angular/core';

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
  imports: [],
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
}
