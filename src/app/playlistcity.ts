export class PlaylistCity {
  constructor(public temperature: number,
              public cityName: string,
              public longitude: number,
              public latitude: number,
              public trackNames: string[],
              public totalTracks: number,
              public pageIndex: number,
              public pageSize: number) {
  }
}
