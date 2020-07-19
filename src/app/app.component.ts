import { Component } from '@angular/core';
import { PaletteService } from './services/palette.service';
import { CommentBotService } from './services/comment-bot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    pallete: PaletteService,
    bots: CommentBotService
  ) {
    pallete.setMode(false);
    bots.startBots();
  }
}
