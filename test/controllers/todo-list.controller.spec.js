import 'angular/angular';
import 'angular-mocks/angular-mocks';
import {todoApp} from '../../src/main';

describe('test todo-list.controller.spec', () => {
  let $controller;

  beforeEach(angular.mock.module(todoApp.name));

  beforeEach(inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('should call a test', () => {
    var ctrl = $controller('TodoListController', {$scope: {}});
    expect(ctrl.todos).toEqual([
      {text: 'learn angular', done: true},
      {text: 'build an angular app', done: false}
    ]);
  });
});
