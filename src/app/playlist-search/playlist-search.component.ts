import {Component, Output, EventEmitter, Input, AfterViewInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {PlaylistCity} from '../playlistcity';
import {SpotifyService} from '../spotify.service';
import {PageEvent} from '@angular/material/paginator/paginator';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-playlist-search',
  templateUrl: './playlist-search.component.html',
  styleUrls: ['./playlist-search.component.css']
})
export class PlaylistSearchComponent implements AfterViewInit {
  @Output() playlistCityEvent = new EventEmitter<PlaylistCity>();
  @Input() pageEvent: BehaviorSubject<PageEvent>;

  searchForm = this.fb.group({
    cityName: null,
    lat: null,
    long: null
  });

  playlistCity: PlaylistCity;

  constructor(private fb: FormBuilder,
              private spotifyService: SpotifyService) {}

  ngAfterViewInit(): void {
    this.pageEvent.subscribe(page => {
      if (page) {
        this.search(page.pageIndex, page.pageSize);
      }
    });
  }

  onSubmit(): void {
    this.search(0, 20);
  }

  private search(offset, pageSize): void {
    const cityName = this.searchForm.get('cityName').value || '';
    const lat = this.searchForm.get('lat').value || 0;
    const long = this.searchForm.get('long').value || 0;
    this.spotifyService
      .searchPlaylist(cityName, lat, long, offset, pageSize).subscribe(data => {
        console.log(data);
        this.playlistCity = data;
        this.playlistCityEvent.emit(this.playlistCity);
      }
    );
  }
}
