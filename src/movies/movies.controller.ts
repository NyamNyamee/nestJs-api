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

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return always movies';
  }

  // nestJs와 expressJs에서 @Get(':id')컨트롤러보다 아래에 정의된 @Get()컨트롤러의 url을 id로 인식한다. 혐그인듯?
  @Get('search')
  // @Query === 스프링의 @Param
  search(@Query('title') title: string, @Query('year') year: number) {
    return `We're searching for a movie with title:${title} & year:${year}`;
  }

  @Get(':id')
  // @Param === 스프링의 @PathVariable
  getOne(@Param('id') id) {
    return `This will return id:${id} movie`;
  }

  @Post()
  create(@Body() movieData: object) {
    return movieData;
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return `This will delete ${id} movie`;
  }

  @Patch(':id')
  update(@Param('id') id, @Body() updateData: object) {
    return {
      movieId: id,
      ...updateData,
    };
  }
}
