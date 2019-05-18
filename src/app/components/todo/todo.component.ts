import { Component, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/todo';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less']
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  todoBody: string;
  todoId: number;
  editingCache: string;
  isEditingAnywhere: boolean;

  constructor() { }

  ngOnInit() {
    this.editingCache = '';
    this.isEditingAnywhere = false;
    this.todoBody = '';
    this.todos = [
      {
        'id':1,
        'body':'Demonstrate / explain basic Create Action',
        'completed':false,
        'editing':false,
      },
      {
        'id':2,
        'body':'Demonstrate / explain basic Read Action',
        'completed':false,
        'editing':false,
      },
      {
        'id':3,
        'body':'Demonstrate / explain basic Update Action',
        'completed':false,
        'editing':false,
      },
      {
        'id':4,
        'body':'Demonstrate / explain basic Destroy Action',
        'completed':false,
        'editing':false,
      },
      {
        'id':5,
        'body':'Demonstrate / explain "completed" feature',
        'completed':false,
        'editing':false,
      },
      {
        'id':6,
        'body':'Demonstrate / explain "ordering" feature',
        'completed':false,
        'editing':false,
      },
    ]
    this.todoId = this.todos.length + 1;
  }

  createTodo(): void {
    // If the user tries to enter an empty string, return early. 
    // Don't add anything, rather than adding an empty element.
    if(this.todoBody.trim().length === 0) {
      return
    }

    //Push the contents of the Input field into state
    this.todos.push({
      id:this.todoId,
      body:this.todoBody,
      completed:false,
      editing:false,
    })

    //Reset the contents of todoBody (which is changed according to the input field)
    this.todoBody = '';
    this.todoId++;
  }

  updateTodo(todo: Todo): void {
    if (this.isEditingAnywhere === false) {
      this.editingCache = todo.body;
      this.isEditingAnywhere = true;
      todo.editing = true;
    }

  }
  
  doneUpdatingTodo(todo: Todo): void {
    if(todo.body.trim().length === 0) {
      todo.body = this.editingCache;
    }
    this.isEditingAnywhere = false;
    todo.editing = false;
  }

  cancelUpdatingTodo(todo: Todo): void {
    todo.body = this.editingCache;
    this.isEditingAnywhere = false;
    this.doneUpdatingTodo(todo);
  }

  destroyTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id != id)
  }

  drop(event: CdkDragDrop<object[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

}
