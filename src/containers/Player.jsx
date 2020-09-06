import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getVideoSoruce } from '../actions';

import '../assets/styles/containers/Player.scss';

const Player = (props) => {
  const { id } = props.match.params;
  const hasPlaying = Object.keys(props.playing).length > 0;

  useEffect(() => {
    props.getVideoSoruce(id);
  }, []);

  return hasPlaying ? (
    <div className='Player'>
      <video controls autoPlay>
        <source src='' type='video/mp4' />
      </video>
      <div className='Player-back'>
        <button type='button' onClick={() => props.history.goBack()}>
          Regresar
        </button>
      </div>
    </div>
  ) : <Redirect to='/404/' />;
};

const mapStateToProp = (state) => {
  return {
    playing: state.playing,
  };
};

const mapDispatchToProp = {
  getVideoSoruce,
};

export default connect(mapStateToProp, mapDispatchToProp)(Player);
