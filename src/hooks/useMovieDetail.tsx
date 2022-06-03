import {useState, useEffect} from 'react';
import movieDB from '../api/MovieDB';
import { CreditsResponse, Cast } from '../interfaces/creditsinterface';
import {MovieFull} from '../interfaces/movieInterface';

interface MovieDetails {
  isLoading: boolean;
  movieFull?: MovieFull;
  cast: Cast[];
}

export const useMovieDetail = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>({
      isLoading: true,
      movieFull: undefined,
      cast: []
  });

  const getMovieDetail = async () => {
    const movieDetailPromise = await movieDB.get<MovieFull>(`/${movieId}`);
    const castPromise = await movieDB.get<CreditsResponse>(
      `/${movieId}/credits`,
    );

    const [movieDetailResp, castPromiseResp] = await Promise.all([
      movieDetailPromise,
      castPromise,
    ]);

    setState({
        isLoading: false,
        movieFull: movieDetailResp.data,
        cast: castPromiseResp.data.cast
    })
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

  return {
    ...state
  };
};
