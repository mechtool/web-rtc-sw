import {Component, Input, OnInit} from '@angular/core';
import {SettingContext} from "../../../../Classes/MainClasses";

@Component({
  selector: 'app-setting-item',
  templateUrl: './setting-item.component.html',
  styleUrls: ['./setting-item.component.css']
})
export class SettingItemComponent implements OnInit {

    @Input() public context : SettingContext;
    constructor() { }

  ngOnInit() {
  }

}
