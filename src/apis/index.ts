import {AxiosRequestHeaders, CancelToken} from 'axios';
import config from '../configs';
import {apiGet, fakePromise} from '../utils';

const {api_url, api_version} = config.env;
export const base_url = api_url + api_version + '/';
const base_movie = base_url + 'movie/';
const base_person = base_url + 'person/';
const base_tv = base_url + 'tv/';

interface ApiProps {
  params?: {[Key: string]: any};
  headers?: AxiosRequestHeaders;
  cancelToken?: CancelToken;
  othersParamOrPayload?: {[Key: string]: any};
}

const apiConfig = props => {
  return {
    params: props.params,
    cancelToken: props.cancelToken,
  };
};
export function fakeApiFunction(props: ApiGetProps) {
  console.log('fakeApiFunction');
  return fakePromise(3000, false, {data: {results: []}});
}
export interface ApiGetProps extends ApiProps {
  id?: string | number;
}
export function getMovieTopRatedApi(props: ApiGetProps) {
  return apiGet(`${base_movie}top_rated`, apiConfig(props));
}
export function getNowPlayingApi(props: ApiGetProps) {
  return apiGet(`${base_movie}now_playing`, apiConfig(props));
}

export function getMoviePopularApi(props: ApiGetProps) {
  return apiGet(`${base_movie}popular`, apiConfig(props));
}

export function getMovieUpcomingApi(props: ApiGetProps) {
  return apiGet(`${base_movie}upcoming`, apiConfig(props));
}

export function getPersonPopularApi(props: ApiGetProps) {
  return apiGet(`${base_person}popular`, apiConfig(props));
}

export function getTvAiringTodayApi(props: ApiGetProps) {
  return apiGet(`${base_tv}airing_today`, apiConfig(props));
}
export function getTvTopRatedApi(props: ApiGetProps) {
  return apiGet(`${base_tv}top_rated`, apiConfig(props));
}
export function getTvPopularApi(props: ApiGetProps) {
  return apiGet(`${base_tv}popular`, apiConfig(props));
}

export function getTvOnTheAirApi(props: ApiGetProps) {
  return apiGet(`${base_tv}on_the_air`, apiConfig(props));
}
export function getDetailListApi(page: string) {
  let apiFunction;
  switch (page) {
    case 'tv_aring_today':
      apiFunction = getTvAiringTodayApi;
      break;
    case 'tv_top_rated':
      apiFunction = getTvTopRatedApi;
      break;
    case 'tv_popular':
      apiFunction = getTvPopularApi;
      break;
    case 'tv_on_the_air':
      apiFunction = getTvOnTheAirApi;
      break;
    case 'movie_upcoming':
      apiFunction = getMovieUpcomingApi;
      break;
    case 'movie_popular':
      apiFunction = getMoviePopularApi;
      break;
    case 'movie_now_playing':
      apiFunction = getNowPlayingApi;
      break;
    case 'popular_person':
      apiFunction = getPersonPopularApi;
      break;
    case 'movie_top_rated':
      apiFunction = getMovieTopRatedApi;
      break;
    default:
      apiFunction = fakeApiFunction;
  }
  return apiFunction;
}
