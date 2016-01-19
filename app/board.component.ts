import {Component} from 'angular2/core';
import { Row } from './row.component';

@Component({
    selector: '.board',
    template: '<div class="row" *ngFor="#value of values">{{value}}</div>',
    directives: [ Row ]
})
export class Board {
    values: number[] = [1, 2, 3];
}
