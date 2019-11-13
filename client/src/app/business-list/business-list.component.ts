import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {

  private _bList = [];

  filteredBList = [];

  @Input()
  set bList(nextList: any[]) {
    this._bList = nextList;
  }
  get bList() {
    return this._bList;
  }

  @Output() nextBList = new EventEmitter<any[]>();

  setNextBList = () => {
    // TODO:
    this.filteredBList = this._bList.slice(0, 1);
    this.nextBList.emit(this.filteredBList)
    return this.filteredBList;
  };

  constructor() { }

  ngOnInit() {
  }



}
