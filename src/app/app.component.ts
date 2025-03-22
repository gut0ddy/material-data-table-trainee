import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TentativaComponent} from './table/tentativa/tentativa.component';

@Component({
  selector: 'app-root',
  imports: [TentativaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projeto-novo';
}
