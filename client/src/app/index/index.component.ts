import { Component, OnInit } from '@angular/core';
import MicroModal from 'micromodal';

import { Business } from '../_interfaces/business.interface';
import { WeatherInfo } from '../_interfaces/weather.interface';

import { BusinessService } from '../_services/business.service';
import { WeatherService } from '../_services/weather.service';
import { ActivatedRoute, Params } from '@angular/router';


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

  private _currentTab = "search";
  private _blistSearchTerm = "";

  businessList: Business[] = [];

  businessShowOnMap: Business[] = [];

  businessResults = {
    search: [],
    top: []
  }

  weatherInfo = {
    main: {},
    weather: []
  } as WeatherInfo;

  get currentTab() {
    return this._currentTab;
  }

  set currentTab(nextTab: string) {
    this._currentTab = nextTab;
    this.nextMapView(nextTab)
  }

  get blistSearchTerm() {
    return this._blistSearchTerm;
  }

  set blistSearchTerm(nextTerm: string) {
    this._blistSearchTerm = nextTerm;
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
    
    this.setBusinessResult("top", bList, this.currentTab === "top");
  }

  setBusinessResult = (key: string, newList: Business[], showOnMap = true) => {
    this.businessResults[key] = [];
    this.businessResults[key] = newList;
    if (showOnMap) {
      this.switchMapView(key);
    }
  };

  nextMapView = (tabName: string) => {
    if (tabName === "suggest") {
      this.showDialog("modalSuggest");
    } else {
      this.switchMapView(tabName);
    }
  }

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

  getCurrentLocation = async () => {

    let routerQuery = await this.getRouteQuery();

    if (routerQuery.lat && routerQuery.lon) {

      (<any>this.currentLocation.coords.latitude) = routerQuery.lat;
      (<any>this.currentLocation.coords.longitude) = routerQuery.lon;

      this.currentMapView.latitude = routerQuery.lat;
      this.currentMapView.longitude = routerQuery.lon;
      this.currentMapView.zoom = 12;
      this.getWeather();
      this.getBusinessList();

    } else {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.currentLocation = pos;
        this.currentMapView.latitude = pos.coords.latitude;
        this.currentMapView.longitude = pos.coords.longitude;
        this.currentMapView.zoom = 12;
        this.getWeather();
        this.getBusinessList();
      });
    }

  };

  showDialog = (dialogName: string) => {
    MicroModal.show(dialogName);
  };

  closeDialog = (dialogName: string) => {
    MicroModal.close(dialogName);
  };

  setNextSuggestion = (ideaTag: string) => {
    this.closeDialog("modalSuggest");
    this.currentTab = "search";
    this.blistSearchTerm = ideaTag;
  };

  getWeather = async () => {
    let latitude = this.currentLocation.coords.latitude || this.currentMapView.latitude;
    let longitude = this.currentLocation.coords.longitude || this.currentMapView.longitude;
    this.weatherInfo = await this.weatherService.getWeatherByLocation(latitude, longitude);
  };

  getRouteQuery = async () => {
    return new Promise<Params>((resolve) => {
      this.route.queryParams.subscribe(
        (params) => {
          resolve(params);
        }
      );
    })
  };

  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    MicroModal.init();
    this.getCurrentLocation();
    this.getBusinessList();
    this.getWeather();
  }


}
