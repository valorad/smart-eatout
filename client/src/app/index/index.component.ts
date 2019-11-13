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
    this.setBusinessResult("search", newList);
  }

  setBusinessResult = (key: string, newList: Business[]) => {
    this.businessResults[key] = newList;
    this.switchMapView(key);
  };

  switchMapView = (key: string) => {
    if (this.businessResults[key]) {
      this.businessShowOnMap = this.businessResults[key];
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
