import { Component, OnInit, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

/* Use class based quill editor styling as server now supports.
import Quill from "quill";

// For Alignment inline style
var AlignStyle = Quill.import("attributors/style/align");
Quill.register(AlignStyle, true);

// // For size inline style
var Size = Quill.import("attributors/style/size");
Size.whitelist = ["small", "large"];
Quill.register(Size, true);
*/

@Component({
  selector: "app-quill-editor",
  templateUrl: "./quill-editor.component.html",
  styleUrls: ["./quill-editor.component.scss"],
})
export class QuillEditorComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() placeholder: String;
  @Input() quillConfig = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      ["link"],
      [{ size: ["small", "large"] }],
    ],
  };

  constructor() {}

  ngOnInit() {}
}
