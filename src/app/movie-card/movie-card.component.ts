import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { NotificationsService } from 'angular2-notifications'

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  soundTracks: any[];
  currentSoundTrack: any;
  currentMedia:any;
  soundTrackImage1: string = "";
  soundTrackImage2: string = "";
  soundTrackImage3: string = "";
  soundTrackImage4: string = "";
  shuffledSoundTrackImages: any[] = ["", "", "", ""]


  constructor(private spotifyService: SpotifyService, 
    private notificationsService: NotificationsService) { }

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

    while(this.currentSoundTrack.preview_url == null) {
      this.getNextSoundTrack()
    }

    this.currentMedia = new Audio(this.currentSoundTrack.preview_url)

    console.log(this.currentSoundTrack)
    console.log(this.currentMedia)
    return new Promise((resolve, reject) => { 
      if("loadeddata") {
        resolve('ok');
      } else {
        reject('error');
      }
    }).then(x => this.currentMedia.play())

  }

  startGuessing() {
    this.getNextSoundTrack()
  }

  getNextSoundTrack() {
    this.soundTracks.shift();
    if(this.currentMedia) this.currentMedia.pause();
    this.currentSoundTrack = this.soundTracks[0].track
    this.getSoundTrackImages()
    this.playCurrentSoundTrack()

  }


  checkSoundTrack(soundTrackImageURL) {
    if(soundTrackImageURL === this.currentSoundTrack.album.images[1].url) {
      this.notificationsService.success("Well done!")
      console.log("Well done")
    } else {
      this.notificationsService.error("Oh snap!")
      console.log("Oh snap")
    }

    this.soundTracks.shift();
    if(this.currentMedia) this.currentMedia.pause();
    this.currentSoundTrack = this.soundTracks[0].track
    this.getSoundTrackImages()
    this.playCurrentSoundTrack()

  }

}
