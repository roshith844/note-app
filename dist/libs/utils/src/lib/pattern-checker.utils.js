"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternChecker = void 0;
class PatternChecker {
    hasLongWord(text) {
        return /\b\w{16,}\b/.test(text);
    }
}
exports.PatternChecker = PatternChecker;
//# sourceMappingURL=pattern-checker.utils.js.map