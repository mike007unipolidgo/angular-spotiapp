import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

	constructor(
	private http:HttpClient
	) { }

	getQuery( query:string ){
		const url = `https://api.spotify.com/v1/${query}`;
		const headers = new HttpHeaders({
			Authorization:'Bearer BQAZ6AG3tLfyKFYaXNmHYNc1YwamFZA0IIGvTVgFPje5cGovQyH-5KruRo1XqsRRlhUGxuKfX5ZG1P4loI4'
		});
		return this.http.get( url, { headers } );
	}

	getNewReleases(){
		return this.getQuery('browse/new-releases?limit=20')
		.pipe(map( data => data['albums'].items));
	}

	getArtistasBuscados( termino:string ){
		return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
		.pipe(map( data => data['artists']['items']));
	}

	getArtista( id:string ){
		return this.getQuery(`artists/${id}`);
	}

	getTopTracks( id:string ){
		return this.getQuery(`artists/${id}/top-tracks?country=us`)
		.pipe(map( data => data['tracks'] ));
	}

}
