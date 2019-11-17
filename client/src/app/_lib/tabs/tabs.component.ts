/**
 * The main component that renders single TabComponent
 * instances.
 */

import {
  Component,
  ContentChildren,
  QueryList,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

import { TabComponent } from './tab.component';

@Component({
  selector: 'lib-tabs',
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"]
})
export class TabsComponent {

  _currentTab: string;

  @Input()
  set currentTab(tabName: string) {
    
    this._currentTab = tabName;
    this.selectTab(tabName);
  }
  get currentTab() {
    return this._currentTab;
  }

  @Output() currentTabChange = new EventEmitter<string>();

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  
  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab)=>tab.active);
    
    // // if there is no active tab set, activate the first
    if (activeTabs.length <= 0) {
      this.selectTab(this.currentTab || this.tabs.first.name);
    }
  }
  
  selectTab(tabName: string){

    if (this.tabs) {
      let tabs = this.tabs.toArray();
      for (let tab of tabs) {
        if (tab.name === tabName) {
          // activate the tab the user has clicked on.
          tab.active = true;
        } else {
          // deactivate all other tabs
          tab.active = false;
        }
      }
    }

    this.currentTabChange.emit(tabName);


  }
}
