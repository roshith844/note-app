import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ListNote, Note } from '@app/models';
import { NoteDataService } from '@app/services';
import { ToastrService } from 'ngx-toastr';
import { DomManager, NotetypeChecker } from '@app/utils';

@Component({
  selector: 'app-list-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.css'],
})
export class ListFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() edit = false;
  @Input() indexToEdit: number | null = null;
  @Output() closeListForm = new EventEmitter(); // Event to close the Form

  showListValidationMessage = false;
  showAllValidationMessages = false;

  constructor(
    public noteDataService: NoteDataService,
    private notification: ToastrService,
    private domManager: DomManager,
    private noteTypeChecker: NotetypeChecker
  ) {}

  listSubmitForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    list: new FormArray(
      [
        new FormGroup({
          content: new FormControl(''),
          strike: new FormControl(false),
        }),
      ],
      [Validators.minLength(1)]
    ),
    date: new FormControl(new Date()),
    type: new FormControl('list'), // list / text
  });

  get list(): FormArray {
    return this.listSubmitForm.get('list') as FormArray;
  }

  get title() {
    return this.listSubmitForm.get('title');
  }

  // Loads all Data form LocalStorage
  ngOnInit(): void {
    this.domManager.lockScreenScroll(true);
    this.domManager.lockScreenScroll(false, 'list');
  }
  ngOnChanges(): void {
    if (this.edit === true && this.indexToEdit != null) {
      const data = this.noteDataService.getNoteByIndex(this.indexToEdit);

      if (
        !data ||
        !data.title ||
        !this.noteTypeChecker.isInstanceofListNote(data)
      )
        return;

      const allFormControls = data.list?.map(
        (listItem: { content: string; strike: boolean }) => {
          return new FormGroup({
            content: new FormControl(listItem.content),
            strike: new FormControl(listItem.strike),
          });
        }
      );

      if (!allFormControls) return;
      this.listSubmitForm = new FormGroup({
        title: new FormControl(data.title, [Validators.required]),
        list: new FormArray(allFormControls, [Validators.minLength(1)]),
        date: new FormControl(new Date()),
        type: new FormControl('list'), // list / text
      });
    }
  }

  ngOnDestroy(): void {
    this.domManager.lockScreenScroll(false); // Enables scrolling
  }

  // Getter
  get listControls() {
    return this.listSubmitForm.get('list') as FormArray;
  }

  // Manages Form Submission
  onSubmit() {
    const formData = this.listSubmitForm.value as ListNote;

    this.showListValidationMessage = false;
    this.validateListItems(formData);

    if (this.title?.invalid) {
      this.showAllValidationMessages = true;
      this.removeEmptyListFeilds(formData);
      this.validateListItems(formData);
      return;
    } else {
      this.removeEmptyListFeilds(formData);
      if (formData.list?.length === 0) {
        this.showListValidationMessage = true;
        return;
      }
    }

    this.removeEmptyListFeilds(formData);

    this.validateListItems(formData);

    if (this.edit === true && this.indexToEdit !== null) {
      this.noteDataService.replaceNoteByIndex(
        this.indexToEdit,
        formData as ListNote
      );
    } else {
      this.noteDataService.addOneNote(formData as ListNote); // Adds list in the beginning
    }

    if (this.edit) this.notification.success('Edited Note', 'Success');
    else this.notification.success('New List Note Added');
    this.emitCloseEvent();
  }

  // Checks list has one item with value
  validateListItems(formData: ListNote) {
    if (!(formData.list && formData.list?.length >= 1))
      this.showListValidationMessage = true;
  }

  // Removes all list Item that has empty list
  removeEmptyListFeilds(formData: ListNote) {
    formData.list = formData.list?.filter(
      (item: { content: string; strike: boolean }) =>
        !item.content ? false : true
    );
  }

  // Adds new List Item feild to form
  addList() {
    this.listControls.push(this.newList());
    this.domManager.scrollToBottom('list');
  }
  newList(): FormGroup {
    return new FormGroup({
      content: new FormControl(''),
      strike: new FormControl(false),
    });
  }
  removeListItemFromForm(i: number) {
    if (i >= 0 && i < this.listControls.length) this.listControls.removeAt(i);
  }

  // Closes the List Form
  emitCloseEvent() {
    this.closeListForm.emit();
  }
}
