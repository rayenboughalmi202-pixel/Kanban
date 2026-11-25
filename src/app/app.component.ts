import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableauComponent } from './features/tableau/tableau.component';

@Component({
  selector: 'app-root',
 imports: [RouterOutlet, TableauComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kanban';
}
