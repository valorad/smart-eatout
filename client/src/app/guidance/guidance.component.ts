import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-guidance',
  templateUrl: './guidance.component.html',
  styleUrls: ['./guidance.component.scss']
})
export class GuidanceComponent implements OnInit {

  suggestions = [
    {
      name: "sunny",
      nameDisplay: "Sunny Day",
      icon: "icon-sunny",
      tags: "cafe",
    },
    {
      name: "rainy",
      nameDisplay: "It Rains",
      icon: "icon-rainy",
      tags: "tea",
    },
    {
      name: "hot",
      nameDisplay: "Hot day",
      icon: "icon-hot",
      tags: "ice cream",
    },
    {
      name: "cold",
      nameDisplay: "Freezing Cold",
      icon: "icon-snow",
      tags: "hot pot",
    },
    {
      name: "happy",
      nameDisplay: "Feeling happy",
      icon: "icon-happy",
      tags: "pot",
    },
    {
      name: "sad",
      nameDisplay: "Need Comfort",
      icon: "icon-sad",
      tags: "dollarama",
    }
  ];

  @Output() nextIdea = new EventEmitter<string>();

  selectIdea = (ideaIndex: number) => {
    this.nextIdea.emit(this.suggestions[ideaIndex].tags);
  };

  constructor() { }

  ngOnInit() {
  }

}
