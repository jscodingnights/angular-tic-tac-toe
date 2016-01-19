import {Component} from 'angular2/core';
import { Cell } from './cell.component';

@Component({
    selector: '.row',
    template: '<div class="cell" *ngFor="#value of values"></div>',
    directives: [ Cell ]
})
export class Row {
    values: number[] = [1, 2, 3];
}
