import { Injectable} from '@angular/core';
import {AppContextService} from "./app-context.service";
import {SwPushNotificationService} from "./sw-push-notification.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
    
    public descriptors = ['camera', /*'microphone', */'notifications'];
    public permissionValues = {} ;
    
    constructor(
        public appContext : AppContextService,
	public swPushService : SwPushNotificationService
    ) {//При старте получаем значения настроек
    		this.descriptors.forEach(desc => {
		    this.permissionValues[desc] = window.localStorage.getItem(desc);
	})
    }
    
    async checkPermissions(){
        //Проверка разрешений на использования api в зависимости от настроек
	await Promise.all(this.descriptors.map(desc => new Promise((res , rej) => {
	    this.permissionValues[desc] !== 'Не использовать' && navigator.permissions.query({name : desc} as any).then(per => {
	        per.onchange = onChangeStatus.bind(this);
	        res( {[desc] : per})
	    })
	}))).then(permissionStatus => {
	    //Отчистить имеющиеся предупреждения
	    this.appContext.notificationComp.notifications = [];
	    this.appContext.appChangeRef.detectChanges();
	    
	    //Новый запуск всех разрешений
	    for(let i = 0; i < permissionStatus.length; i++){
		let value = Object.values(permissionStatus[i])[0],
		    key = Object.keys(permissionStatus[i])[0];
		if(value.state === 'prompt' || value.state === 'denied'){
		    //Требуется вывод оповещения пользователю
		    setTemplateContext.bind(this,{listener : this.onClickPermission.bind(this),color : value.state === "prompt" ? '#000' : '#c70900' , type : key, visible : true, text : value.state === 'prompt' ? 'Для правильной работы приложения, необходимо запросить Ваше разрешение на использование '+ (key === 'camera' ? ' камеры и микрофона' : 'Push-уведомлений' ) +'. Это разрешение будет запрошено один раз и будет использовано в дальнейшем автоматмчески.' : 'К сожалению, Вы отклонили запрос Вашего разрешения на использование приложением ' + (key === 'camera' ? 'камеры и микрофона' : 'Push-уведомлений')  +'. Дальнейшая работа приложения невозможна. Снимите запрет использования ' + (key === 'camera' ? 'камеры и микрофона' : 'Push-уведомлений')  +' и повторите попытку.', disabled: value.state !== 'prompt'})() ;
		}
	    }
	}).catch(err => console.error(err)) ;
	
	function setTemplateContext(context) {
	    this.appContext.notificationComp.notifications.push(context);
	    this.appContext.appChangeRef.detectChanges();
	}
	
	function onChangeStatus(){
	    this.checkPermissions();
	}

    }
    onClickPermission(event){
        //Если разрешение это - разрешение notifications
        if(event.currentTarget.classList.contains('notifications')) {
            this.swPushService.requestSubscription();
	}
        //Если проверяется разрешение для камеры
        else if(event.currentTarget.classList.contains('camera')){
	    (async ()=>{
	        await navigator.mediaDevices.getUserMedia({
		    audio: true,
		    video: true,
		}).then(stream => {
		    stream.getTracks().forEach(tr => tr.stop());
		}).catch(err => {
		    console.log('Пользоатель не дал разрешение на использования web-rtc.')
		});
	    })();

	}
        
    }
}
