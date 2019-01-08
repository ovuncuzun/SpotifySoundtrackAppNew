import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  soundTracks: any[];
  soundTrackImage1: string = "";
  soundTrackImage2: string = "";
  soundTrackImage3: string = "";
  soundTrackImage4: string = "";

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.getSoundTracks()
  }

  getSoundTracks() {
    this.spotifyService.getSoundTracks().subscribe(p => {
      this.soundTracks = p;
      this.getSoundTrackImages()
    });
  }

  getSoundTrackImages() {
    let queueLength = this.soundTracks.length;
    let random1 = this.getRandomNumber(0,queueLength - 1)
    console.log(random1)
    let random2 = this.getRandomNumber(0,queueLength - 1)
    console.log(random2)
    let random3 = this.getRandomNumber(0,queueLength - 1)
    let random4 = this.getRandomNumber(0,queueLength - 1)


    this.soundTrackImage1 = this.soundTracks[random1].track.album.images[1].url;
    this.soundTrackImage2 = this.soundTracks[random2].track.album.images[1].url;
    this.soundTrackImage3 = this.soundTracks[random3].track.album.images[1].url;
    this.soundTrackImage4 = this.soundTracks[random4].track.album.images[1].url;

    console.log(this.soundTrackImage1)
  }

  getRandomNumber(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
