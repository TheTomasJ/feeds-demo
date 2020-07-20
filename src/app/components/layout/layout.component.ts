import { Component } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { PaletteService } from 'src/app/services/palette.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  public baseHref = environment.baseHref;

  constructor(public session: SessionService, public palette: PaletteService) { }

}
