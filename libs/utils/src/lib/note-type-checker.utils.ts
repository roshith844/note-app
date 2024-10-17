import { ListNote, Note } from '@app/models';

export class NotetypeChecker {
 public  isInstanceOfNote(data: Note | ListNote): data is Note {
    return 'content' in data ? true : false;
  }

 public isInstanceofListNote(data: Note | ListNote): data is ListNote {
    return 'list' in data ? true : false;
  }
}
