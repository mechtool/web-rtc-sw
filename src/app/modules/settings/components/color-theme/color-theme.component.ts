import { Component, OnInit } from '@angular/core';
import {ColorThemeService} from "../../../../services/color-theme.service";

@Component({
  selector: 'app-color-theme',
  templateUrl: './color-theme.component.html',
  styleUrls: ['./color-theme.component.css']
})
export class ColorThemeComponent implements OnInit {
  constructor(public colorService : ColorThemeService) { }
  
  ngOnInit() {
       this.resetActive();
  }
  
  resetActive(){
      //Изменение статуса активности
      this.colorService.colorItems.forEach(item => {
	  item.active = window.localStorage.getItem('appColorClass') === item.colorClass;
      })
  }
  
  onClickColor(item){
      this.colorService.setAppTheme(item.colorClass);
      this.resetActive();
  }

}
