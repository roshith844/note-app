import { Injectable } from '@angular/core';
import { ListNote, Note } from '@app/models';
import { NotetypeChecker } from '@app/utils';

@Injectable({
  providedIn: 'root',
})
export class NoteDataService {
  allNotes: (ListNote | Note)[] = [];

  constructor(public noteTypeChecker: NotetypeChecker) {}

  getAllNotes(): (ListNote | Note)[] {
    this.getDataToApp();
    return this.allNotes;
  }

  getNoteByIndex(index: number): Note | ListNote {
    return this.allNotes[index];
  }

  replaceNoteByIndex(index: number, note: Note | ListNote) {
    this.allNotes[index] = note;
    this.syncLocalStorage();
  }
  strikeList(noteIndex: number, listIndex: number, strike = true) {
    const item = this.getNoteByIndex(noteIndex);
    if (this.noteTypeChecker.isInstanceofListNote(item) && item.list) {
      if (strike === true) item.list[listIndex].strike = true;
      else if (strike === false) item.list[listIndex].strike = false;
    }
    this.syncLocalStorage();
  }

  getDataToApp() {
    const data = localStorage.getItem('note');
    if (data) this.allNotes = JSON.parse(data);
  }

  addOneNote(note: Note | ListNote) {
    this.allNotes.unshift(note);
    this.syncLocalStorage();
  }
  removeOneNote(index: number) {
    if (index >= 0 && index <= this.lengthOfNotes()) {
      this.allNotes.splice(index, 1);
      this.syncLocalStorage();
    }
  }

  lengthOfNotes(): number {
    return this.allNotes.length;
  }

  private syncLocalStorage() {
    localStorage.setItem('note', JSON.stringify(this.allNotes));
  }
}
