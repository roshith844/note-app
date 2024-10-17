export class PatternChecker {
  public hasLongWord(text: string): boolean {
    return /\b\w{16,}\b/.test(text);
  }
}
