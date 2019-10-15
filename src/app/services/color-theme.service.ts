import { Injectable } from '@angular/core';
import {OverlayContainer} from "@angular/cdk/overlay";
import {BehaviorSubject} from "rxjs";
import {AppContextService} from "./app-context.service";

@Injectable({
  providedIn: 'root'
})
export class ColorThemeService {
    
    public colorItems = [
	{colorClass : 'first-theme', backgroundColor : '#ffee58', color : '#cca023', light: 'rgba(255,238,88,0.71)', active : false, iconColor : '#000'},
	{colorClass : 'second-theme', backgroundColor : '#42a5f5', color : '#2d74aa',light: 'rgba(66,165,245,0.73)', active : true, iconColor : '#000'},
	{colorClass : 'third-theme', backgroundColor : '#ff7043', color : '#c13316',light: 'rgba(255,114,69,0.64)', active : false, iconColor : '#000'},
	{colorClass : 'forth-theme', backgroundColor : '#5c6bc0', color : '#23198b',light: 'rgba(92,107,192,0.67)', active : false, iconColor : '#fff'},
    ] ;

    constructor(
      public overlay : 	OverlayContainer,
      public appContext : AppContextService,
) { }
    
    setAppTheme(selector) {
	this.overlay.getContainerElement().classList.add(selector);
	window.localStorage.setItem('appColorClass', selector);
	this.appContext.appColorClass.next(selector);
	return selector;
    }
    getThemeColor(type){
        //Получения цвета приложения по имени свойства объекта цвета: backgroundColor , color , light
        return this.colorItems.filter(color => color.colorClass === this.appContext.appColorClass.value)[0][type];
    }
    getLightColor(){
    
    }
    
}
