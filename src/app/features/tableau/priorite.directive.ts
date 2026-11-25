import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPriorite]',
  standalone: true,
})
export class PrioriteDirective implements OnInit {
  @Input('appPriorite') priorite: 'basse' | 'moyenne' | 'haute' | 'critique' = 'moyenne';

  private couleurs = {
    basse: '#d4edda',
    moyenne: '#fff3cd',
    haute: '#ffe0b3',
    critique: '#f8d7da',
  };

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.style.backgroundColor = this.couleurs[this.priorite];
  }
}
