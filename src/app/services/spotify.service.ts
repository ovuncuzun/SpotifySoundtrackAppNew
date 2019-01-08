import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  queueSoundTracks =  []

  constructor(private http: HttpClient) { }

  getSoundTracks(): Observable<any[]> {
    return this.http.get<any>("http://localhost:8080/api/soundtracks").pipe(
      //tap(data => console.log('All: ' + JSON.stringify(data)))
      tap(data => {
        this.queueSoundTracks = this.queueSoundTracks.concat(data)
        })
    );
  }
}
