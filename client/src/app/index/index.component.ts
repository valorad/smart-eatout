import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  lat = 45.495514;
  lng = -73.578199;

  constructor() { }

  ngOnInit() {
  }

}
