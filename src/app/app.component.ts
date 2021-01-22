import {Component, OnInit} from '@angular/core';
import {PlaylistCity} from './playlistcity';
import {BehaviorSubject} from 'rxjs';
import {PageEvent} from '@angular/material/paginator/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  playlistCityEvent: BehaviorSubject<PlaylistCity>;
  pageEvent: BehaviorSubject<PageEvent>;

  ngOnInit(): void {
    this.playlistCityEvent = new BehaviorSubject<PlaylistCity>(null);
    this.pageEvent = new BehaviorSubject<PageEvent>(null);
  }

  fwdItems($event): void {
    this.playlistCityEvent.next($event);
  }

  fwdPageChange($event): void {
    this.pageEvent.next($event);
  }
}
