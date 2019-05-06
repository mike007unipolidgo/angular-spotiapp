import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {
	artista:any = {};
	loading:boolean;
	topTracks:any[] = [];

	constructor(
	private activatedRoute:ActivatedRoute,
	private spotify:SpotifyService) {
		this.loading = false;
		this.activatedRoute.params.subscribe( params => {
			this.getArtista( params['id'] );
			this.getTopTracks( params['id'] );
		} );
	}

	getArtista( id:string ){
		this.spotify.getArtista( id ).subscribe( artista => {
			console.log( artista )
			this.artista = artista;
			this.loading = true;
		} );
	}

	getTopTracks( id:string ){
		this.spotify.getTopTracks( id ).subscribe( top => {
			this.topTracks = top;
			console.log( this.topTracks );
		});
	}

}
