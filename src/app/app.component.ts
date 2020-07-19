import { Component } from '@angular/core';
import { PaletteService } from './services/palette.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(pallete: PaletteService) {
    pallete.setMode(false);
  }
}
