import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';

import { environment } from 'src/environments/environment';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: any[] = [];
  current_page: number = 1;
  imageBaseUrl: string = environment.imageUrl;

  constructor(
    private movieServie: MovieService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieServie.getTopRatedMovies(this.current_page).subscribe((res) => {
      // this.movies = [...this.movies, ...res.results];
      loading.dismiss();
      this.movies.push(...res.results);
      
      event?.target.complete();

      if (event) {
        event.target.disabled = res.total_pages === this.current_page;
      }
    });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.current_page++;
    this.loadMovies(event);
  }
}
