export type Priorite = 'basse' | 'moyenne' | 'haute' | 'critique';
export type Statut = 'a-faire' | 'en-cours' | 'termine';
export interface Tache {
  id: number;
  projetId: number;
  titre: string;
  description: string;
  priorite: Priorite;
  statut: Statut;
  echeance?: string;
}
