import { Component } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { PaletteService } from 'src/app/services/palette.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(public session: SessionService, public palette: PaletteService) { }

}
