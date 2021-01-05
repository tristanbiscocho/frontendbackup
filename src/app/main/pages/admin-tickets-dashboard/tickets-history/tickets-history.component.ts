import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-tickets-history',
  templateUrl: './tickets-history.component.html',
  styleUrls: ['./tickets-history.component.scss']
})
export class TicketsHistoryComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TicketsHistoryComponent>,
  ) { }

  ngOnInit() {
  }

}
