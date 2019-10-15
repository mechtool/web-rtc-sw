import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusColorsService {

    public statusColors = {webrtc : {perConnectionStates : {new : '#002eab', connecting : '#00a9ab', connected : '#009724', disconnected : '#8d8d8d', failed : '#8d8d8d', closed : '#8d8d8d'}, iceConnectionState : {new : '#002eab', checking : '#00a9ab', connected : '#009724', completed : '#009724', disconnected : '#8d8d8d', failed : '#8d8d8d', closed : '#8d8d8d'}}};
    
  constructor() { }
  
}
