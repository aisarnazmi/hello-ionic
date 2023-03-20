import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: any = null;
  id: string = '';
  imageBaseUrl: string = environment.imageUrl;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    
    this.movieService.getMovieDetails(this.id).subscribe((res) => {
      this.movie = res;

      console.log(this.movie);
      
    });
  }
  
  openHomepage() {
    window.open(this.movie.homepage);
  }
}
