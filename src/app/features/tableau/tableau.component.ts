import { Component, signal, computed } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { PrioriteDirective } from './priorite.directive';
import { Tache } from '../../core/models/tache.model';

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [DragDropModule, PrioriteDirective],
  templateUrl: './tableau.component.html',
  styleUrl: './tableau.component.css',
})
export class TableauComponent {
  taches = signal<Tache[]>([
    { id: 1, projetId: 1, titre: 'Créer le projet Angular', description: 'ng new + GitHub', priorite: 'haute', statut: 'termine' },
    { id: 2, projetId: 1, titre: 'Installer le CDK', description: 'Pour le drag-drop', priorite: 'moyenne', statut: 'termine' },
    { id: 3, projetId: 1, titre: 'Afficher les 3 colonnes', description: 'À faire, En cours, Terminé', priorite: 'haute', statut: 'en-cours' },
    { id: 4, projetId: 1, titre: 'Ajouter le drag-drop', description: 'Déplacer les cartes entre colonnes', priorite: 'critique', statut: 'a-faire', echeance: '2026-11-30' },
    { id: 5, projetId: 1, titre: 'Créer la directive appPriorite', description: 'Couleur selon la priorité', priorite: 'moyenne', statut: 'a-faire' },
  ]);

  filtreTexte = signal('');
  filtrePriorite = signal('toutes');
  nouveauTitre = signal('');
  nouvellePriorite = signal('moyenne');

  tachesFiltrees = computed(() => {
    const texte = this.filtreTexte().toLowerCase();
    const priorite = this.filtrePriorite();
    return this.taches().filter((t) => {
      const okTexte = t.titre.toLowerCase().includes(texte);
      const okPriorite = priorite === 'toutes' || t.priorite === priorite;
      return okTexte && okPriorite;
    });
  });

  aFaire = computed(() => this.tachesFiltrees().filter((t) => t.statut === 'a-faire'));
  enCours = computed(() => this.tachesFiltrees().filter((t) => t.statut === 'en-cours'));
  termine = computed(() => this.tachesFiltrees().filter((t) => t.statut === 'termine'));

  ajouterTache() {
    const titre = this.nouveauTitre().trim();
    if (!titre) { return; }
    const prochainId = Math.max(...this.taches().map((t) => t.id)) + 1;
    const nouvelle: Tache = {
      id: prochainId,
      projetId: 1,
      titre,
      description: '',
      priorite: this.nouvellePriorite() as Tache['priorite'],
      statut: 'a-faire',
    };
    this.taches.update((liste) => [...liste, nouvelle]);
    this.nouveauTitre.set('');
  }

  drop(event: CdkDragDrop<Tache[]>) {
    if (event.previousContainer === event.container) { return; }
    const tache = event.item.data as Tache;
    const nouveauStatut = event.container.id as Tache['statut'];
    this.taches.update((liste) =>
      liste.map((t) => (t.id === tache.id ? { ...t, statut: nouveauStatut } : t))
    );
  }
}
