import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebRtcService {
    
    public configuration = {
	iceServers: [
	    {
		urls: [ "stun:eu-turn2.xirsys.com" ]
	    },
	    {
		username: "_QBDjekzkmjznc7qiVmf8EMX5_O89xSjPiIJcO9ERG9hKuRfOSlANrSRz4ldS1AxAAAAAF1yQnxzaXdh",
		credential: "39cc9e42-d099-11e9-8a44-4a049da423ff",
		urls: [
		    "turn:eu-turn2.xirsys.com:80?transport=udp",
		    "turn:eu-turn2.xirsys.com:3478?transport=udp",
		    "turn:eu-turn2.xirsys.com:80?transport=tcp",
		    "turn:eu-turn2.xirsys.com:3478?transport=tcp",
		    "turns:eu-turn2.xirsys.com:443?transport=tcp",
		    "turns:eu-turn2.xirsys.com:5349?transport=tcp"
		]}]} ;

  constructor() { }
  
  
  
}
