import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-knowledge-base',
  templateUrl: './add-knowledge-base.component.html',
  styleUrls: ['./add-knowledge-base.component.scss']
})
export class AddKnowledgeBaseComponent implements OnInit {
  placeholder = "Content here..."
  constructor() { }

  ngOnInit() {
  }

}
