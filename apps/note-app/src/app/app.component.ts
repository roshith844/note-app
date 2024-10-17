import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  SharedComponentsModule,
  ConfirmBoxComponent,
  ListFormComponent,
} from '@app/shared-components';
import { CommonModule } from '@angular/common';
import { NoteDataService } from '@app/services';
import { ToastrService } from 'ngx-toastr';
import { NotetypeChecker, PatternChecker } from '@app/utils';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    SharedComponentsModule,
    CommonModule,
    ListFormComponent,
    ConfirmBoxComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  activeNoteIndex = 0; // Stores index of Note for Delete
  title = 'note-app';

  visiblity = {
    createForm: {
      text: false,
      list: false
    },
    deleteConfirmBox: false,
    editForm: {
      text: false,
      list: false
    }
  }

  constructor(
    public noteDataService: NoteDataService,
    private notification: ToastrService,
    public noteTypeChecker: NotetypeChecker,
    public patternChecker: PatternChecker
  ) { }

  // Loads data from LocalStorage
  ngOnInit(): void {
    this.noteDataService.getDataToApp();
  }

  /* 
  Shows Forms 
  option: 'list' for createForm.list, 'text' for Text Form
  Edit: true for editForm
  index: pass index to edit
  */
  showForm(option: string, edit = false, index = 0) {
    this.hideAllForms();
    if (edit === false) {
      if (option === 'list') this.visiblity.createForm.list = true;
      else if (option === 'text') this.visiblity.createForm.text = true;
    } else if (edit === true) {
      if (option === 'text') {
        this.activeNoteIndex = index;
        this.visiblity.editForm.text = true;
      } else if (option === 'list') {
        this.activeNoteIndex = index;
        this.visiblity.editForm.list = true;
      }
    }
  }

  // Hides all Forms
  hideAllForms() {
    this.visiblity.createForm.list = false;
    this.visiblity.createForm.text = false
    this.visiblity.editForm.text = false
    this.visiblity.editForm.list = false
  }

  // Shows Delete PopUp
  showDeletePopUp(index: number) {
    this.activeNoteIndex = index;
    this.visiblity.deleteConfirmBox = true;
  }

  // Manages Deletion with confirmation status from user
  handleDeletion(userInput: boolean) {
    this.visiblity.deleteConfirmBox = false
    if (userInput === true) this.deleteNote(this.activeNoteIndex);
    else return;
  }

  // Deletes Single Note
  deleteNote(index: number): void {
    this.noteDataService.removeOneNote(index);
    this.notification.success('Deleted Note', 'success');
  }
}
