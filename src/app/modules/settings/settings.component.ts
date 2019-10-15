import { Component, OnInit } from '@angular/core';
import {AppContextService} from "../../services/app-context.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    public callModel = [{text : 'Sms'}, {text : 'Push'}];
    public update = [{text : 'Проверять и обновлять'}, {text : 'Проверять'}, {text : 'Не проверять'}];
    public settings = [
	{type : 5, optionName : 'Цветовая тема'},
	{type : 0, optionName: 'Модель вызова ', value : this.callModel[parseInt(window.localStorage.getItem('callModel'))].text, options : this.callModel, listener : (value)=> {
	      window.localStorage.setItem('callModel', this.callModel.findIndex(model => {
	         return model.text === value
	      }) + '');
	    }},
	{type : 0, optionName: 'Обновления', value : this.update[parseInt(window.localStorage.getItem('update'))].text, options : this.update, listener : (value)=> {
		window.localStorage.setItem('update', this.update.findIndex(model => {
		    return model.text === value
		}) + '');
	    }}
    ];
  constructor(public appContext : AppContextService) {}

  ngOnInit() {
  }

}
