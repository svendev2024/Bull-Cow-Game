import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: Array<any>;
  masterNumber: any;
  result: Object = { guess: null, b: null, c: null };
  history: Array<Object> = [];
  guess: Number;
  won: Boolean = false;
  lost: Boolean = false;
  tries: any = 0;
  ans: any = 0;
  playMaster: Boolean;
  cpuGuess: Number;
  bull: Number;
  cow: Number;
  constructor(private _dataService: DataService, private alertService: AlertService) {
    // this._dataService.getUsers()
    //   .subscribe(res => this.users = res);
  }
  myFunc() {
    this.playMaster = false;
    console.log("function called");
    this._dataService.getNewNumber()
      .subscribe(
      data => {
        this.masterNumber = data.json().num;
        this.history = [];
        this.result = { guess: null, b: null, c: null };
        this.guess = undefined;
        this.won = false;
        this.lost = false;
        this.tries = 10;
      },
      err => console.error(err),
      () => console.log('started new game')
      );
  }
  makeGuess() {
    if (this.masterNumber) {
      if ((this.guess === undefined) || (this.guess + '').length !== 3 || this.hasRepeatingdigits(this.guess) || (this.guess + '').indexOf('0') > -1) {
        console.log('Invalid Guess');
        this.alertService.warning('Invalid Guess');
      } else {
        this._dataService.check(this.guess)
          .subscribe(
          data => {
            this.result = data.json();
            this.history.push(data.json());
            this.tries--;
            if (data.json().b === 3) {
              console.log('You Won');
              this.alertService.success('Congrats! You Won :)');
              this.won = true;
              this.masterNumber = null;
            } else if (this.tries == 0 && data.json().b !== 3) {
              console.log('Game Over');
              this.alertService.danger('Sorry! You Lost :(');
              this.lost = true;
              this.masterNumber = null;
              this._dataService.show()
                .subscribe(
                data => {
                  this.ans = data.json().ans;
                },
                err => console.error(err),
                () => console.log('reveal ans')
                );
            }
          },
          err => console.error(err),
          () => console.log('guessed'));
      }
    }
  }
  startMaster() {
    this.playMaster = true;
    this.bull = null;
    this.cow = null;
    console.log("Master Game started");
    this._dataService.cpuStartGuess()
      .subscribe(
      data => {
        this.cpuGuess = data.json().cpuGuess;
        this.history = [];
        this.result = { guess: null, b: null, c: null };
        this.guess = undefined;
        this.won = false;
        this.lost = false;
        this.tries = 10;
      },
      err => console.error(err),
      () => console.log('')
      );
  }
  getGuess(bull, cow) {
    console.log(bull, cow)
    if (bull > 3 || cow > 3) {
      this.alertService.warning("Bulls and Cows can't be greater than 3!");
    } else if ((bull + cow) > 3) {
      this.alertService.warning("Bulls + Cows should be less or equal to 3");
    } else if (bull === undefined || bull === null || bull < 0 || cow === undefined || cow < 0 || cow === null) {
      this.alertService.warning("Invalid Bulls or Cows");
    } else {
      if (bull === 3) {
        this.won = true;
        this.alertService.success("Yes! I guessed it!");
      }
      this.history.push({ guess: this.cpuGuess, b: bull, c: cow })
      this._dataService.cpuGuess(this.cpuGuess, bull, cow)
        .subscribe(
        data => {
          this.cpuGuess = data.json().cpuGuess;
        },
        err => {
          console.error('');
          this.alertService.danger("Please start new game!");
          this.alertService.danger("Exhausted number list!");
          this.alertService.danger("Worng feedbacks by user!");
        },
        () => console.log('')
        );
    }
  }
  hasRepeatingdigits(n) {
    return (/([0-9]).*?\1/).test(n)
  }
}
