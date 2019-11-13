import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-tab',
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.scss"]
})
export class TabComponent {
  @Input("tabName") name: string;
  @Input('tabTitle') title: string = name;
  @Input() active = false;
}
