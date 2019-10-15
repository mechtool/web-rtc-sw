import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import {AppContextService} from "./services/app-context.service";
import {AuthFirebaseService} from "./services/auth-firebase.service";
import {ColorThemeService} from "./services/color-theme.service";
import {DatabaseService} from "./services/database.service";
import {PermissionsService} from "./services/permissions.service";
import {SettingsDefaultService} from "./services/settings-default.service";
import {StatusColorsService} from "./services/status-colors.service";
import {SwPushNotificationService} from "./services/sw-push-notification.service";
import {SwUpdateService} from "./services/sw-update.service";
import {WebRtcService} from "./services/web-rtc.service";
import {ApiKeyResolveService} from "./services/api-key-resolve.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./modules/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {GeneralModule} from "./modules/general/general.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true, scope : '/', registrationStrategy: 'registerImmediately'}),
    BrowserAnimationsModule,
      MaterialModule,
      ReactiveFormsModule,
      RouterModule,
      GeneralModule,
  ],
  providers: [
      AppContextService,
      AuthFirebaseService,
      ColorThemeService,
      DatabaseService,
      ApiKeyResolveService,
      PermissionsService,
      SettingsDefaultService,
      StatusColorsService,
      SwPushNotificationService,
      SwUpdateService,
      WebRtcService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appContext: AppContextService) {
/*        if('serviceWorker' in navigator){
           navigator.serviceWorker.register('ngsw-worker.js').then(registration => {
           
	   })
	}*/
	//Обработка события установки приложения на экран устройства
	window.addEventListener("onbeforeinstallprompt", (beforeInstallPromptEvent) => {
	    //Управление переходит в этот обработчик, если приложение еще не установлено (каждый раз)
	    //и не переходит, когда приложение уже установлено
	    this.appContext.installScreenButton.next(false);
	    beforeInstallPromptEvent.preventDefault(); // Предотвратить немедленный запуск отображения диалога
	    this.appContext.beforeInstallPromptEvent.next(beforeInstallPromptEvent);
	});
	//прослушивание события 'appinstall' для определения установки приложения на экран устройства
	window.addEventListener("onappinstalled", (evt) => {
	    //Управление переходит в этот обработчик сразу (next tick) после принятия
	    //предложения об установки приложения один раз и больще никогда не переходит.
	    //приложение уже установлено на экран устройства
	    this.appContext.installScreenButton.next(true);
	});
    }
}
