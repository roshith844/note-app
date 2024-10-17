import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomManager } from '@app/utils';

@Component({
  selector: 'app-confirm-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.css'],
})
export class ConfirmBoxComponent implements OnInit, OnDestroy {
  @Input() title = '(title not set)';
  @Input() subTitle = '(Sub title not set)';
  @Output() userChoice = new EventEmitter<boolean>();

  constructor(private domManager: DomManager) {}

  ngOnInit(): void {
    this.domManager.lockScreenScroll(true);
  }

  ngOnDestroy(): void {
    this.domManager.lockScreenScroll(false);
  }

  // Sends the User Input to Parent
  sendUserChoice(userInput: boolean) {
    this.userChoice.emit(userInput);
  }
}
