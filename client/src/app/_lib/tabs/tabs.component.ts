/**
 * The main component that renders single TabComponent
 * instances.
 */

import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Output,
  EventEmitter,
} from '@angular/core';

import { TabComponent } from './tab.component';

@Component({
  selector: 'lib-tabs',
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"]
})
export class TabsComponent implements AfterContentInit {

  @Output() nextTab = new EventEmitter<string>();

  
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  
  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab)=>tab.active);
    
    // if there is no active tab set, activate the first
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }
  
  selectTab(tab: any){
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);
    
    // activate the tab the user has clicked on.
    tab.active = true;

    // emit tab name selected
    this.nextTab.emit(tab.name)
  }
}
