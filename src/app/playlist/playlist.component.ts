import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {PlaylistItem} from './playlist-datasource';
import {BehaviorSubject} from 'rxjs';
import {PlaylistCity} from '../playlistcity';
import {PageEvent} from '@angular/material/paginator/paginator';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PlaylistItem>;
  @Input() playlistCityEvent: BehaviorSubject<PlaylistCity>;
  @Output() pageEvent = new EventEmitter<PageEvent>();

  dataSource = new MatTableDataSource<PlaylistItem>([]);
  totalItems = 0;
  pageIndex = 0;
  pageSize = 20;
  displayedColumns = ['id', 'name'];
  playlistCitySearched: PlaylistCity;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.paginator.page.subscribe(pageEvent => {
      console.log(pageEvent);
      this.pageEvent.emit(pageEvent);
    });
    this.refresh();
  }

  refresh(): void {
    this.playlistCityEvent.subscribe(playlistCity => {
      this.dataSource.data.length = 0;
      this.playlistCitySearched = playlistCity;
      if (playlistCity) {
        this.totalItems = playlistCity.totalTracks;
        this.pageIndex = playlistCity.pageIndex;
        this.pageSize = playlistCity.pageSize;
        this.dataSource.data = playlistCity.trackNames.map<PlaylistItem>((value, index) =>
          new PlaylistItem(value, (this.pageSize * this.pageIndex) + index + 1));
      }
    });
  }
}
