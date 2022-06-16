import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  // 생성자 주입
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // nestJs와 expressJs에서 @Get(':id')컨트롤러보다 아래에 정의된 @Get()컨트롤러의 url을 id로 인식한다. 혐그인듯?
  @Get('search')
  // @Query === 스프링의 @Param
  search(@Query('title') title: string, @Query('year') year: number) {
    return `We're searching for a movie with title:${title} & year:${year}`;
  }

  @Get(':id')
  // @Param === 스프링의 @PathVariable
  getOne(@Param('id') id: number): Movie {
    return this.moviesService.getOne(id);
  }

  @Post()
  create(@Body() newMovie: CreateMovieDto) {
    this.moviesService.create(newMovie);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    this.moviesService.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(id, updateData);
  }
}
