import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Observable, Subject, Subscription } from 'rxjs';
import { Activities } from '../models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy  {

  todoForm!: FormGroup
  taskArray!: FormArray

  valueChanges$!: Subscription

  abc!: Observable<any>

  @Output()
  onNewActivity = new Subject<Activities>()

  constructor(private fb: FormBuilder) { }

   // Lifecycle hook called after component initialization
  ngOnInit(): void {
    // Create the to-do form using the form builder
    this.todoForm = this.createTodoForm()
    // Create an observable for the to-do form value changes
    this.abc = this.todoForm.valueChanges.pipe(
      debounceTime(500)
    )

    // Subscribe to valueChanges$ observable and log the form values to console
    this.valueChanges$ = this.todoForm.valueChanges.subscribe(
      values => {
        console.info('>>> values: ', values)
      }
    )
  }

  // Lifecycle hook called before component destruction
  ngOnDestroy(): void {
    // Unsubscribe from valueChanges$ observable
    this.valueChanges$.unsubscribe()
  }

  // Method to add a new task to the form
  addTask() {
    // Create a new task form group
    const g = this.fb.group({
      description: this.fb.control<string>('', [ Validators.required ]),
      dueDate: this.fb.control<string>('', [ Validators.required ])
    })
    // Add the task form group to the task array
    this.taskArray.push(g)
  }

  // Method to delete a task from the form
  deleteTask(idx: number) {
    this.taskArray.removeAt(idx)
  }

  // Method to save the to-do form and emit it to the parent component
  saveTodo() {
    const activities = this.todoForm.value as Activities
    this.onNewActivity.next(activities)
    this.todoForm = this.createTodoForm()
  }

  // Method to check if the form is invalid
  isFormInvalid(): boolean {
    return this.todoForm.invalid || this.taskArray.length <= 0
  }

  // Private method to create the to-do form using the form builder
  private createTodoForm(): FormGroup {
    // Create an empty task array
    this.taskArray = this.fb.array([], [ Validators.minLength(1) ])
    // Create the to-do form group and return it
    return this.fb.group({
      taskName: this.fb.control<string>('', [ Validators.required ]),
      name: this.fb.control<string>('', [ Validators.required ]),
      tasks: this.taskArray
    })
  }

}
