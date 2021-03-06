import { html, customElement, css } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";
import PlayerStore from "../../store";
// Components
import "../../components/button";
import "../../components/playlist";
import "../../components/player";
import "../../components/modal";
import "../../view/createPlaylist";
import "../../view/addSong";

@customElement("home-view")
export class HomeView extends MobxLitElement {
  private store = PlayerStore;

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: row;
        flex: 3;
        height: 100%;
      }
    `;
  }

  render() {
    return html`
      <play-list></play-list>

      <video-player
        videoId="${this.store.currentSong
          ? this.store.currentSong.video_id
          : ""}"
      ></video-player>

      <modal-container ?hidden="${this.store.addSongModalHidden}">
        <!-- <create-playlist /> -->
        <add-song />
      </modal-container>
      <modal-container ?hidden="${this.store.createPlaylistModalHidden}">
        <create-playlist />
      </modal-container>
    `;
  }
}
