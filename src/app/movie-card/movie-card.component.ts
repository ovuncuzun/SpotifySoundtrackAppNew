import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  soundTracks: any[];
  currentSoundTrack: any;
  soundTrackImage1: string = "";
  soundTrackImage2: string = "";
  soundTrackImage3: string = "";
  soundTrackImage4: string = "";
  shuffledSoundTrackImages: any[] = ["", "", "", ""]

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.getSoundTracks()
  }

  getSoundTracks() {
    this.spotifyService.getSoundTracks().subscribe(p => {
      this.soundTracks = p;
      this.currentSoundTrack = this.soundTracks[0].track
      this.getSoundTrackImages()
      
    });
  }

  getSoundTrackImages() {
    let queueLength = this.soundTracks.length;
    do {
      let random1 = this.getRandomNumber(0,queueLength - 1)
      this.soundTrackImage1 = this.soundTracks[random1].track.album.images[1].url;
    } while (this.soundTrackImage1 === this.currentSoundTrack.album.images[1].url)
    
    do {
      let random2 = this.getRandomNumber(0,queueLength - 1)
      this.soundTrackImage2 = this.soundTracks[random2].track.album.images[1].url;
    } while (this.soundTrackImage2 === this.currentSoundTrack.album.images[1].url || this.soundTrackImage2 === this.soundTrackImage1)
    
    do {
      let random3 = this.getRandomNumber(0,queueLength - 1)
      this.soundTrackImage3 = this.soundTracks[random3].track.album.images[1].url;
    } while (this.soundTrackImage3 === this.currentSoundTrack.album.images[1].url || this.soundTrackImage3 === this.soundTrackImage1 || this.soundTrackImage3 === this.soundTrackImage2)
    
    this.shuffledSoundTrackImages = this.shuffleSoundTrackImages()
    
  }

  getRandomNumber(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  shuffleSoundTrackImages() {
    let soundTrackImagesArray = [
      this.currentSoundTrack.album.images[1].url,
      this.soundTrackImage1,
      this.soundTrackImage2,
      this.soundTrackImage3
    ]

    let currentIndex = soundTrackImagesArray.length
    let temporaryValue, randomIndex
   
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = soundTrackImagesArray[currentIndex];
      soundTrackImagesArray[currentIndex] = soundTrackImagesArray[randomIndex];
      soundTrackImagesArray[randomIndex] = temporaryValue;
    }

    return soundTrackImagesArray;
  }

  playCurrentSoundTrack() {
    let media = new Audio(this.currentSoundTrack.preview_url)
    console.log(this.currentSoundTrack)
    console.log(media)
    return new Promise((resolve, reject) => { 
      if("loadeddata") {
        resolve('ok');
      } else {
        reject('error');
      }
    }).then(x => media.play())

  }

  startGuessing() {
    this.playCurrentSoundTrack()
  }

}
