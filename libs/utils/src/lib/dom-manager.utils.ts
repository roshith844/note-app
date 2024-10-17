export class DomManager {
  lockScreenScroll(lock: boolean, id: string | false = false) {
    if (id === false) {
      if (lock === true) document.body.style.setProperty('overflow', 'hidden');
      else if (lock === false)
        document.body.style.setProperty('overflow-y', 'auto');
    } else {
      if (lock === true)
        document.getElementById(id)?.style.setProperty('overflow', 'hidden');
      else if (lock === false)
        document.getElementById(id)?.style.setProperty('overflow-y', 'auto');
    }
  }

  scrollToBottom(id: string) {
    const htmlElement = document.getElementById(id);
    setTimeout(() => {
      const lastInputElement = htmlElement?.lastElementChild;
      lastInputElement?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 0);
  }
}
