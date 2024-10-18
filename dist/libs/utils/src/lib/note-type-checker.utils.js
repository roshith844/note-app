"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotetypeChecker = void 0;
class NotetypeChecker {
    isInstanceOfNote(data) {
        return 'content' in data ? true : false;
    }
    isInstanceofListNote(data) {
        return 'list' in data ? true : false;
    }
}
exports.NotetypeChecker = NotetypeChecker;
//# sourceMappingURL=note-type-checker.utils.js.map