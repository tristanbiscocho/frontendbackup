import { Component, OnInit, ChangeDetectorRef, Inject, ViewEncapsulation , Pipe,PipeTransform} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser'
import { fuseAnimations } from '@fuse/animations';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
@Component({
  selector: 'app-message-viewer',
  templateUrl: './message-viewer.component.html',
  styleUrls: ['./message-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class MessageViewerComponent implements OnInit {
  dialogTitle: string;
  type: any;
  request: any;
  obj:any;
  constructor(public dialogRef: MatDialogRef<MessageViewerComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef) {
      this.request = data.event;

     
     }

  ngOnInit() {
  }

}
