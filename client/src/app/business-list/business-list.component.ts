import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Business } from '../_interfaces/business.interface';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {

  private _bList = [];

  filteredBList = [];

  private _searchTerm = "";

  get searchTerm() {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.pipe();
    this.setNextBList();
  }

  @Input()
  set bList(nextList: Business[]) {
    this._bList = this.cloneJSONArray(nextList);
  }
  get bList() {
    return this._bList;
  }

  @Output() nextBList = new EventEmitter<Business[]>();

  setNextBList = () => {
    this.nextBList.emit(this.filteredBList)
  };

  pipe = () => {
    this.filteredBList = this.filterByNameOrTag(this.searchTerm);
  };

  filterByNameOrTag = (token: string) => {

    return this.bList.filter(
      (business) => {
        return ( business.name.toLowerCase().includes(token.toLowerCase()) || business.categories.toLowerCase().includes(token.toLowerCase()) )
      }
    );
  };

  cloneJSONArray = (arr: any[]) => {
    let newArr: any[] = [];
    for (let obj of arr) {
      let newObj = Object.assign({}, obj);
      newArr.push(newObj);
    }
    return newArr;
  };

  constructor() { }

  ngOnInit() {
  }



}
