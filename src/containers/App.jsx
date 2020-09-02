import React from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Footer from '../components/Footer';
import useInitialState from '../hooks/useInitialState';

import '../assets/styles/App.scss';

// API que voy a utitilizar
const apiKey = '0565066595da223a4dafb6fd8548205c';
//const url = `https://api.themoviedb.org/3/movie/551?api_key=${apiKey}`;
const popularMovies = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;

const App = () => {
  const initialState = useInitialState(popularMovies);

  return (
    <div className='App'>
      <Header />
      <Search />

      <Categories title='Mi lista'>
        <Carousel>
          {initialState.results.map((item) => <CarouselItem key={item.id} {...item} />)}
        </Carousel>
      </Categories>

      <Categories title='Tendencias'>
        <Carousel>
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
        </Carousel>
      </Categories>

      <Footer />
    </div>

  );
};

export default App;
