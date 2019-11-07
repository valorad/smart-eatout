import { Component, OnInit } from '@angular/core';

import { Business } from '../_interfaces/business.interface';

import { BusinessService } from '../_services/business.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  currentLocation = {
    longitude: -73.578199,
    latitude: 45.495514
  }

  businessList: any[] = [];

  constructor(
    private businessService: BusinessService
  ) { }

  ngOnInit() {
    this.getBusinessList();
    
  }

  getBusinessList = async () => {
    this.businessList = await this.businessService.getListByLocation(this.currentLocation.longitude, this.currentLocation.latitude);
    console.log(this.businessList);
  }

}
