import React from 'react';
import { connect } from 'react-redux';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import useInitialState from '../hooks/useInitialState';

import '../assets/styles/App.scss';

// API que voy a utitilizar
const apiKey = '0565066595da223a4dafb6fd8548205c';
//const url = `https://api.themoviedb.org/3/movie/551?api_key=${apiKey}`;
const popularMovies = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;

const Home = ({ myList, trends, originals }) => {
  const initialState = useInitialState(popularMovies);

  return (
    <>
      {myList.length > 0 && (
        <Categories title='Mi lista'>
          <Carousel>
            {initialState.results.map((item) => (
              <CarouselItem
                key={`${item.id}_mylist`}
                {...item}
                isList
              />
            ))}
          </Carousel>
        </Categories>
      )}

      <Categories title='Tendencias'>
        <Carousel>
          {initialState.results.map((item) => <CarouselItem key={`${item.id}_trends`} {...item} />)}
        </Carousel>
      </Categories>

      <Categories title='Originales'>
        <Carousel>
          {initialState.results.map((item) => <CarouselItem key={`${item.id}_originals`} {...item} />)}
        </Carousel>
      </Categories>
    </>

  );
};
const mapStateToProps = (state) => {
  return {
    myList: state.myList,
    trends: state.trends,
    originals: state.originals,
  };
};
export default connect(mapStateToProps, null)(Home);
