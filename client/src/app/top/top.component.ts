import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  modes = [
    {
      name: "allTime",
      nameDisplay: "All Time"
    },
    {
      name: "recent",
      nameDisplay: "Recent Weeks"
    }
  ]

  currentMode = "allTime";

  selectMode = (nextMode: string) => {
    this.currentMode = nextMode;
  };

  constructor() { }

  ngOnInit() {
  }

}
