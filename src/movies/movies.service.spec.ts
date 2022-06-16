import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('shoud return an array', () => {
      expect(service.getAll()).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a move', () => {
      service.create({
        title: 'Test Movie',
        year: 2022,
        genres: ['Action'],
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.title).toEqual('Test Movie');
    });

    it('should throw NFE', () => {
      try {
        service.getOne(2);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2022,
        genres: ['Action'],
      });

      const beforeDelete = service.getAll();
      service.delete(1);
      const afterDelete = service.getAll();
      expect(afterDelete.length).toBeLessThan(beforeDelete.length);
    });

    it('shoud throw NFE', () => {
      try {
        service.delete(1);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('creates a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2022,
        genres: ['Action'],
      });

      expect(service.getOne(1)).toBeDefined();
      expect(service.getAll()).toContain(service.getOne(1));
    });
  });
});
