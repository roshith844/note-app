import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListNote, Note } from '@app/models';
import { NoteDataService } from '@app/services';
import { DomManager, NotetypeChecker } from '@app/utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.css'],
})
export class TextFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() edit = false;
  @Input() indexToEdit: number | null = null;
  @Output() closeTextForm = new EventEmitter(); // sends Event to Close the form

  showAllValidationMessages = false;

  textSubmitForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    date: new FormControl(new Date()),
    type: new FormControl('text'),
  });

  constructor(
    public noteDataService: NoteDataService,
    private notification: ToastrService,
    private domManager: DomManager,
    private noteTypeChecker: NotetypeChecker
  ) {}

  get title() {
    return this.textSubmitForm.get('title');
  }
  get content() {
    return this.textSubmitForm.get('content');
  }

  // Loads all Notes
  ngOnInit(): void {
    this.domManager.lockScreenScroll(true);
  }
  ngOnChanges(): void {
    if (this.edit === true && this.indexToEdit != null) {
      const data = this.noteDataService.getNoteByIndex(this.indexToEdit);
      if (
        !data ||
        !this.noteTypeChecker.isInstanceOfNote(data) ||
        !data.title ||
        !data.content
      )
        return;

      this.textSubmitForm = new FormGroup({
        title: new FormControl(data.title, [Validators.required]),
        content: new FormControl(data.content, [Validators.required]),
        date: new FormControl(new Date()),
        type: new FormControl('text'),
      });
    }
  }

  ngOnDestroy(): void {
    this.domManager.lockScreenScroll(false);
  }

  // Manages form submission
  onSubmit() {
    // validation
    if (this.textSubmitForm.invalid) {
      this.showAllValidationMessages = true;
      return;
    }

    const formData = this.textSubmitForm.value as Note;

    if (this.edit === true && this.indexToEdit !== null) {
      this.noteDataService.replaceNoteByIndex(this.indexToEdit, formData);
      this.notification.success('Edited Note', 'Success');
    } else {
      this.noteDataService.addOneNote(formData);
      this.notification.success('New Note Added');
    }
    this.closeTextForm.emit();
  }
}
