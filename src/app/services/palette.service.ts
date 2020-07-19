import { Injectable } from '@angular/core';

interface Palette {
  bg1: string;
  bg2: string;
  bg3: string;
  bg4: string;
  cm: string;
  cc: string;
}


@Injectable({
  providedIn: 'root'
})
export class PaletteService {

  public darkMode: boolean;

  constructor() {
  }

  public setMode(useDarkMode: boolean): void {
    this.darkMode = useDarkMode;
    const pickedPalette: Palette = useDarkMode ?
      {
        bg1: '#383838',
        bg2: '#2d2d2d',
        bg3: '#272727',
        bg4: '#1e1e1e',
        cm: '#000000',
        cc: '#FFFFFF'
      } :
      {
        bg1: '#EEEEEE',
        bg2: '#F5F5F5',
        bg3: '#FAFAFA',
        bg4: '#FFFFFF',
        cm: '#FFFFFF',
        cc: '#000000'
      };

    for(let key in pickedPalette) {
      document.documentElement.style.setProperty('--' + key, pickedPalette[key]);
    }
  }

  public toggle() {
    this.setMode(!this.darkMode);
  }
}
