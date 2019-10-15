import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApplicationComponent} from "./application/application.component";
import {ApiKeyResolveService} from "../../services/api-key-resolve.service";


const routes: Routes = [
    {path : '', component: ApplicationComponent, resolve : {apiKey : ApiKeyResolveService}, data : {type : 'application'}, children : [
	{path : 'settings' , loadChildren :  () => import('../settings/settings.module').then(m => m.SettingsModule),  data : {type : 'settings-page'}},
	    {path : 'contacts' , loadChildren :  () => import('../contacts/contacts.module').then(m => m.ContactsModule),  data : {type : 'contacts-page'}},
	    {path : 'messages' , loadChildren :  () => import('../messages/messages.module').then(m => m.MessagesModule),  data : {type : 'messages-page'}},
	    {path : 'announcements' , loadChildren :  () => import('../announcements/announcements.module').then(m => m.AnnouncementsModule),  data : {type : 'announcements'}},
	    {path : 'user-data' , loadChildren :  () => import('../user-data/user-data.module').then(m => m.UserDataModule),  data : {type : 'user-data'}},
	    {path : 'new-message', loadChildren : ()=> import('../new-message/new-message.module').then(m => m.NewMessageModule),  data : {type : 'new-message'}},
	    {path : 'web-rtc', loadChildren : ()=> import('../web-rtc/web-rtc.module').then(m => m.WebRtcModule),  data : {type : 'web-rtc'}},
	    {path : '', pathMatch : 'full', redirectTo : 'messages'}
	]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
