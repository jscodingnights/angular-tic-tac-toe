import {Component} from 'angular2/core';

@Component({
    selector: 'my-title',
    template: '<h1>{{title}}</h1>'
})
export class MyTitle {

  public title : String = 'Tic Tac Toe!!!';

}
