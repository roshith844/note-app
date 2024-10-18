import { ListNote, Note } from '@app/models';
export declare class NotetypeChecker {
    isInstanceOfNote(data: Note | ListNote): data is Note;
    isInstanceofListNote(data: Note | ListNote): data is ListNote;
}
