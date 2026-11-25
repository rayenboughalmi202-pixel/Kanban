import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableauComponent } from './tableau.component';

describe('TableauComponent', () => {
  let component: TableauComponent;
  let fixture: ComponentFixture<TableauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filtre les tâches par texte', () => {
    component.filtreTexte.set('drag');
    expect(component.aFaire().length).toBe(1);
    expect(component.aFaire()[0].titre).toBe('Ajouter le drag-drop');
  });

  it('change le statut après un drop', () => {
    const tache = component.taches()[3];
    const event = {
      previousContainer: { id: 'a-faire' },
      container: { id: 'en-cours' },
      item: { data: tache },
    } as any;
    component.drop(event);
    expect(component.taches()[3].statut).toBe('en-cours');
  });
});
