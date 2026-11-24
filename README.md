# Kanban

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
## Partie 2 — Tableau & drag-drop (Rayen Boughalmi)

Page `/tableau` : un tableau Kanban avec 3 colonnes (À faire, En cours, Terminé).

### Fonctionnalités
- Affichage des tâches en 3 colonnes, avec des fausses données en attendant le service (Partie 1).
- Drag-drop (Angular CDK) : glisser une carte d'une colonne à l'autre change son statut.
- Directive `appPriorite` : la couleur de la carte change selon la priorité (critique rouge, haute orange, moyenne jaune, basse verte).
- Filtres : recherche par titre + filtre par priorité.
- Ajout rapide : une tâche s'ajoute dans la colonne « À faire ».

### Fichiers
- `src/app/features/tableau/tableau.component.ts` (+ `.html`, `.css`)
- `src/app/features/tableau/priorite.directive.ts`

### Tests
- `tableau.component.spec.ts` : création, filtre par texte, changement de statut après un drop.
- `priorite.directive.spec.ts` : couleur d'une tâche critique.
- Lancer les tests : `npx ng test --watch=false`

### Lancer le projet
- `npm install`
- `npm start` puis ouvrir http://localhost:4200
