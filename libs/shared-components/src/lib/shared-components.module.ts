import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFormComponent } from './text-form/text-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [TextFormComponent],
  exports: [TextFormComponent],
})
export class SharedComponentsModule {}
