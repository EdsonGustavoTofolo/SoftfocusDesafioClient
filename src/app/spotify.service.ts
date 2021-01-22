import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlaylistCity} from './playlistcity';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private URL_API = 'http://localhost:8080/api/playlist';

  constructor(private http: HttpClient) {
  }

  searchPlaylist(cityName, lat, long, offset, pageSize): Observable<PlaylistCity> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('cityName', cityName);
    httpParams = httpParams.append('latitude', lat);
    httpParams = httpParams.append('longitude', long);
    httpParams = httpParams.append('offset', offset);
    httpParams = httpParams.append('pageSize', pageSize);
    return this.http.get<PlaylistCity>(this.URL_API, { params: httpParams });
  }
}


