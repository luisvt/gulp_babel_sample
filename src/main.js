import 'angular/angular';
import {TodoListController} from "./controllers/todo-list.controller";

export let todoApp = angular.module('todoApp', [])
  .controller('TodoListController', TodoListController);

angular.bootstrap(document, [todoApp.name]);
