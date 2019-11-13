import { Component, OnInit } from '@angular/core';

import { Business } from '../_interfaces/business.interface';

import { BusinessService } from '../_services/business.service';
import { LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  currentLocation = {
    longitude: -73.578199,
    latitude: 45.495514,
    zoom: 8
  }

  businessList: any[] = [];

  businessShowOnMap: any[] = [];

  constructor(
    private businessService: BusinessService
  ) { }

  ngOnInit() {
    this.getBusinessList();
  }

  getBusinessList = async () => {
    this.businessList = await this.businessService.getListByLocation(this.currentLocation.longitude, this.currentLocation.latitude);
  }

  setNewMarkers = (newList: any[]) => {
    this.businessShowOnMap = newList;
    // move to first marker
    if (newList.length > 0) {
      let position = newList[0].location.coordinates;
      this.setCurrentLocation(position[0], position[1], 16)
    }
  }

  setCurrentLocation = (longitude: number, latitude: number, zoom=8) => {
    this.currentLocation = {
      ...this.currentLocation,
      longitude,
      latitude,
      zoom: 16
    }
  };

}
