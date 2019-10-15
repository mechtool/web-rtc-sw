import {Injectable} from '@angular/core';
import { SwPush } from "@angular/service-worker";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {DatabaseService} from "./database.service";
import {AppContextService} from "./app-context.service";

@Injectable({
  providedIn: 'root'
})
export class SwPushNotificationService {

  constructor(
      public swPush : SwPush,
      public http : HttpClient,
      private router : Router,
      public database : DatabaseService,
      public appContext : AppContextService) {}
      //Общая функция инициализации Push-Notification в приложении
  async requestSubscription(){
      if(this.swPush.isEnabled){
          //Подписка на событие получения сообщения, когда приложение в фокусе
	  this.swPush.messages.subscribe(message => {
	        //Получение сообщения, его подготовка и отображение пользователю
	  });
          //Подписка на обработку активности пользователя при получении сообщения и нажатии на него
	  this.swPush.notificationClicks.subscribe(action => {
	      //Обработка активности пользователя на текущем сообщении
	  }) ;
          //Если существует объект подписки, то будет инициализирован, иначе вернет null, если подписки еще нет
          this.swPush.subscription.subscribe(sub => {
          
	  }) ;
  //Проверка разрешения поьзователя и получения объекта подписки по заранее сгенерированномц открытому ключу
	  await this.swPush.requestSubscription({
	      serverPublicKey: this.appContext.apiKey.publicKey,
	  }).then(async subscription => {
	      //Сохранение объекта подписки на сервере, в элементе пользователя приложением
	      await this.database.sendSubscription(subscription).then(res => console.log('Объект подписки испешно сохранен на сервере.')).catch(err => console.error('Ошибка при сохранении объекта подписки на сервере. '+ err))
	      //Объект подписки успешно записан в бузу данных для текущего пользователя
	      //Подписка на получения сообщений
	      
	      })
      }else{
         //Браузер не поддерживает Push/Notification
	  //todo Обеспечить закрытие приложения
	  console.log('Браузер не поддерживает функциональность Push/Notifications. Работа приложения невозможна.');
	  await this.router.navigateByUrl('/authorization') ;
      }

  }
  
  
}
