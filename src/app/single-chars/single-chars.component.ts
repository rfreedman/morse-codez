/* tslint:disable:variable-name */
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-single-chars',
  template: `
   <div class="content">
     <div style="margin-bottom:20px;">
       <label for="repeatQty">Repeat: </label>
       <select id="repeatQty" [(ngModel)]="repeatQty">
         <option *ngFor="let r of repeats" [ngValue]="r">{{r}}</option>
       </select>
       <span style="display:inline-block; width:20px">&nbsp;</span>
       <label for="interval">Repeat Interval (ms): </label>
       <input type="number" [(ngModel)]="interval"/>
       <button class="btnStop" [disabled]="repeatsRemaining === 0" (click)="stop()">Stop</button>
     </div>

     <div class="button_div" id="letter_buttons_a_m">
       <button class="cwbutton" *ngFor="let letter of lettersAtoM" (click)="play(letter)">{{letter}}</button>
     </div>

     <div class="button_div" id="letter_buttons_n_z">
       <button class="cwbutton" *ngFor="let letter of lettersNtoZ" (click)="play(letter)">{{letter}}</button>
     </div>

     <div class="button_div" id="number_buttons">
       <button class="cwbutton" *ngFor="let number of numbers" (click)="play(number)">{{number}}</button>
     </div>

     <div class="button_div" id="punctuation_buttons">
       <button class="cwbutton" *ngFor="let punc of punctuation" (click)="play(punc)">{{punc}}</button>
     </div>

     <div class="button_div" id="prosign_buttons">
       <button class="cwbutton prosign" *ngFor="let prosign of prosigns" (click)="play(prosign)">{{prosign}}</button>
     </div>
   </div>
  `,
  styles: [`
    .button_div {
      margin-bottom: 20px;
    }
    .cwbutton {
      width: 2em;
      margin-right:1.0em;
    }

    .cwbutton.prosign {
        width: 4em;
    }

    .btnStop {
      margin-left: 20px;
    }
  `]
})
export class SingleCharsComponent implements OnInit {

  readonly audio = document.createElement('audio');

  readonly lettersAtoM = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G',
    'H', 'I', 'J', 'K', 'L', 'M'
  ];

  readonly lettersNtoZ = [
    'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  readonly numbers = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
  ];

  readonly punctuation = [
    '?'
  ];

  readonly prosigns = [
    '<BT>',
    '<BK>'
  ];

  readonly repeats = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  private _repeatIntervalMs = 750;
  private _repeatQty = 1;
  repeatsRemaining = 0;

  // ===============================================
  set repeatQty(value: number) {
    this._repeatQty = value;
  }
  get repeatQty(): number {
    return this._repeatQty;
  }
  // ===============================================
  set interval(value: number) {
    this._repeatIntervalMs = value;
  }
  get interval(): number {
    return this._repeatIntervalMs;
  }

  ngOnInit(): void {
    this.audio.addEventListener('ended', () => {
      setTimeout(this.playRepeater, this._repeatIntervalMs);
    }, false);
  }

  play(buttonTxt): void {
    this.audio.src = this.getAudioFileName(buttonTxt);
    this.repeatsRemaining = this.repeatQty;
    this.playRepeater();
  }

  playRepeater = () => {
    if (this.repeatsRemaining > 0) {
      this.repeatsRemaining--;
      this.audio.play().then(() => {
      });
    }
  }

  stop(): void {
    this.repeatsRemaining = 0;
  }

  getAudioFileName(txt: string): string {
    if (txt === '?') {
      return 'assets/question_mark.mp3';
    }

    if (txt.toLowerCase() === '<bt>') {
      return 'assets/_BT_.mp3';
    }

    if (txt.toLowerCase() === '<bk>') {
      return 'assets/_BK_.mp3';
    }

    return `assets/${txt.toLocaleLowerCase()}.mp3`;
  }
}
