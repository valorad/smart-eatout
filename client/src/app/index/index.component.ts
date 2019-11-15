import { Component, OnInit } from '@angular/core';

import { Business } from '../_interfaces/business.interface';

import { BusinessService } from '../_services/business.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  currentMapView = {
    longitude: -73.578199,
    latitude: 45.495514,
    zoom: 4
  }

  currentLocation = {
    coords: {},
    timestamp: 0
  } as Position;

  businessList: Business[] = [];

  businessShowOnMap: Business[] = [];

  businessResults = {
    search: [],
    top: []
  }

  constructor(
    private businessService: BusinessService
  ) { }

  ngOnInit() {
    this.getCurrentLocation();
    this.getBusinessList();
  }

  getBusinessList = async () => {
    this.businessList = await this.businessService.getListByLocation(this.currentMapView.longitude, this.currentMapView.latitude);
  }

  setNextSearchResult = (newList: Business[]) => {
    
    let blist = newList.slice(0);
    // set label
    for (let business of blist) {
      business.label = business.name[0];
    }
    
    this.setBusinessResult("search", blist);
  }

  setNextTopResult = (newList: Business[]) => {
    
    let bList = newList.slice(0);
    // set label
    for (let i = 0; i < bList.length; i++) {
      bList[i].label = (i + 1).toString();
    }
    
    this.setBusinessResult("top", bList, false);
  }

  setBusinessResult = (key: string, newList: Business[], showOnMap = true) => {
    this.businessResults[key] = newList.slice(0);
    if (showOnMap) {
      this.switchMapView(key);
    }
  };

  switchMapView = (key: string) => {

    if (this.businessResults[key]) {
      this.businessShowOnMap = this.businessResults[key].slice(0);
      // move to first marker
      if (this.businessShowOnMap.length > 0) {
        let position = this.businessShowOnMap[0].location.coordinates;
        this.setCurrentMapView(position[0], position[1], 16)
      }
    }
    
  }

  setCurrentMapView = (longitude: number, latitude: number, zoom=8) => {
    this.currentMapView = {
      ...this.currentMapView,
      longitude,
      latitude,
      zoom,
    }
  };

  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.currentLocation = pos;
      this.currentMapView.latitude = pos.coords.latitude;
      this.currentMapView.longitude = pos.coords.longitude;
      this.currentMapView.zoom = 12;
    });
    
  };

}
