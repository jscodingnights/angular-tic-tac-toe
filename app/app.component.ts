import { Component } from 'angular2/core';
import { Board } from './board.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.html',
    directives: [ Board ]
})
export class AppComponent { }
