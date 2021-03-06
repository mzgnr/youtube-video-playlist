import { observable, action, computed } from "mobx";
import { idGenerator, youtube_url_parser } from "../utils";

export interface SongModel {
  id: string;
  artist: string;
  title: string;
  url: string;
  video_id?: string;
}

export interface PlaylistModel {
  id: string;
  name: string;
  songs: SongModel[];
}

/**
 * Manages Player Store
 *
 * @export
 * @class PlayerStore
 */
export class PlayerStore {
  @observable currentSongId = "";
  @observable currentPlaylistId = "";
  @observable createPlaylistModalHidden = true;
  @observable addSongModalHidden = true;
  @observable playlists: PlaylistModel[] = [
    {
      id: "1",
      name: "First Playlist",
      songs: [
        {
          id: "1",
          artist: "BÖ & Serhat Durmus",
          title: "Elimi Tut (ft. Ecem Telli)",
          url: "https://www.youtube.com/watch?v=Hh2Sxuzqqw0",
          video_id: "Hh2Sxuzqqw0"
        },
        {
          id: "2",
          artist: "Y2K, bbno$",
          title: "Lalala (Official Video)",
          url: "https://www.youtube.com/watch?v=FZZogxdiJMA",
          video_id: "FZZogxdiJMA"
        },
        {
          id: "3",
          artist: "Mahmut Orhan & Colonel Bagshot",
          title: "6 Days",
          url: "https://www.youtube.com/watch?v=1W5BA0lDVLM",
          video_id: "1W5BA0lDVLM"
        },
        {
          id: "4",
          artist: "Max Oazo ft. CAMI",
          title: "Supergirl (Original Mix)",
          url: "https://www.youtube.com/watch?v=FnywjbkPsOA",
          video_id: "FnywjbkPsOA"
        },
        {
          id: "5",
          artist: "Jay Aliyev",
          title: "Move On (Original Mix)",
          url: "https://www.youtube.com/watch?v=akQHzKjkhPw",
          video_id: "akQHzKjkhPw"
        }
      ]
    }
  ];

  @observable isLoading: boolean = false;
  constructor() {}

  @computed
  get currentPlaylist() {
    return (
      this.playlists.find(playlist => playlist.id === this.currentPlaylistId) ||
      this.playlists[0]
    );
  }

  @computed
  get currentSong() {
    const currentSong =
      this.currentPlaylist &&
      this.currentPlaylist.songs.find(song => song.id === this.currentSongId);
    return currentSong || this.currentPlaylist.songs[0];
  }
  @action
  createPlaylist(name: string) {
    this.playlists.push({
      id: idGenerator(),
      name: name,
      songs: []
    });
  }

  @action
  addSongToCurrentPlaylist(song: SongModel) {
    const id = idGenerator();
    const video_id = youtube_url_parser(song.url);
    if (video_id === "") {
      return false;
    }
    if (song.title === "" || song.artist === "" || song.url === "") {
      return false;
    } else {
      song.id = id;
      song.video_id = video_id;
      this.currentPlaylist.songs.push(song);
      return true;
    }
  }
  @action
  setCurrentSong(songId: string) {
    this.currentSongId = songId;
  }
  @action
  setNextSong() {
    const currentPlaylistLength = this.currentPlaylist.songs.length;
    const currentSongIndex = this.currentPlaylist.songs.findIndex(
      song => song.id === this.currentSongId
    );
    const playlistReachedEnd = currentSongIndex + 1 === currentPlaylistLength;

    const nextSongId = playlistReachedEnd
      ? this.currentPlaylist.songs[0].id
      : this.currentPlaylist.songs[currentSongIndex + 1].id;

    if (currentSongIndex > -1) {
      // set first songId when last song played
      this.currentSongId = nextSongId;
    }
  }
}

export default new PlayerStore();
