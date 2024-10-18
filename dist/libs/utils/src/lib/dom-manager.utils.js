"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomManager = void 0;
class DomManager {
    lockScreenScroll(lock, id = false) {
        var _a, _b;
        if (id === false) {
            if (lock === true)
                document.body.style.setProperty('overflow', 'hidden');
            else if (lock === false)
                document.body.style.setProperty('overflow-y', 'auto');
        }
        else {
            if (lock === true)
                (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.style.setProperty('overflow', 'hidden');
            else if (lock === false)
                (_b = document.getElementById(id)) === null || _b === void 0 ? void 0 : _b.style.setProperty('overflow-y', 'auto');
        }
    }
    scrollToBottom(id) {
        const htmlElement = document.getElementById(id);
        setTimeout(() => {
            const lastInputElement = htmlElement === null || htmlElement === void 0 ? void 0 : htmlElement.lastElementChild;
            lastInputElement === null || lastInputElement === void 0 ? void 0 : lastInputElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 0);
    }
}
exports.DomManager = DomManager;
//# sourceMappingURL=dom-manager.utils.js.map