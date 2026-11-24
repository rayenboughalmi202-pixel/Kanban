import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrioriteDirective } from './priorite.directive';

@Component({
  standalone: true,
  imports: [PrioriteDirective],
  template: `<div [appPriorite]="'critique'">Test</div>`,
})
class TestComponent {}

describe('PrioriteDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('colore en rouge une tâche critique', () => {
    const div = fixture.nativeElement.querySelector('div') as HTMLElement;
    expect(div.style.backgroundColor).toBe('rgb(248, 215, 218)');
  });
});
