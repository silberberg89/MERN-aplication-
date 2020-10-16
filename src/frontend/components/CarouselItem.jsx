import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setFavorite, deleteFavorite } from '../actions';

import '../assets/styles/components/CarouselItem.scss';

import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import removeIcon from '../assets/static/remove-icon.png';

const CarouselItem = (props) => {
  const { id, poster_path, title, release_date, contentRating, isList } = props;
  const handleSetFavorite = () => {
    props.setFavorite({
      poster_path, title, release_date, contentRating,
    });
  };
  const handleDeleteFavorite = (itemId) => {
    props.deleteFavorite();
  };
  return (
    <div className='carousel-item'>
      <img className='carousel-item__img' src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
      <div className='carousel-item__details'>
        <div>
          <Link to={`/palyer/${id}`}>
            <img
              className='carousel-item__details--img'
              src={playIcon}
              alt='Play Icon'
            />
          </Link>
          {isList ? (
            <img
              className='carousel-item__details--img'
              src={removeIcon}
              alt='Remove Icon'
              onClick={() => handleDeleteFavorite(id)}
            />
          ) : (
            <img
              className='carousel-item__details--img'
              src={plusIcon}
              alt='Plus Icon'
              onClick={handleSetFavorite}
            />
          )}

        </div>
        <p className='carousel-item__details--title'>{title}</p>
        <p className='carousel-item__details--subtitle'>
          {`Se estrenó el dia: ${release_date}`}
        </p>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  poster_path: PropTypes.string,
  title: PropTypes.string,
  release_date: PropTypes.string,
  contentRating: PropTypes.number,
};
const mapDispatchToProps = {
  setFavorite,
  deleteFavorite,
};
export default connect(null, mapDispatchToProps)(CarouselItem);
