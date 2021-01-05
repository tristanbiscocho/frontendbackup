import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillEditorComponent } from './quill-editor.component';
import { QuillModule } from 'ngx-quill'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [QuillEditorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule
  ],
  exports: [
    QuillEditorComponent
  ]
})
export class QuillEditorModule { }
