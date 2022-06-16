import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }

  create(newMovie: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...newMovie,
    });
  }

  delete(id: number): void {
    this.getOne(id); // 없으면 에러뱉기
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id); // 없으면 애러뱉기
    this.delete(id);
    this.movies.push({
      ...movie,
      ...updateData,
    });
  }
}
