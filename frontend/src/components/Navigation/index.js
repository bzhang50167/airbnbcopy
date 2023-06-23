import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import image from '../../images/github-mark.png'
import image2 from '../../images/LI-In-Bug.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory()

  const handleSearch = (e) => {
    e.preventDefault();
    history.push({
      pathname: '/search',
      state: searchQuery
    });
    setSearchQuery('')
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery('')
      handleSearch(e);
      setSearchQuery('')
    }
    setSearchQuery('')
  };


  return (
    <ul className='topOfPage'>
      <div>
        <NavLink exact to="/">
          <img
            className='banner'
            src='https://www.lettingagenttoday.co.uk/upload/STAA-Logo-400x310.jpg'
          />
        </NavLink>
      </div>
      <div>
      </div>
      <div>
        <input
          className='searchbar'
          type='text'
          placeholder='search...'
          onKeyDown={handleKeyPress}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        <a rel='none' href='https://github.com/bzhang50167/airbnbcopy' target='_blank'>
          <img src={image} className='links'/>
        </a>
        {' '}
        <a rel='none' href='https://www.linkedin.com/in/bao-heng-zhang-b43731256/' target='_blank'>
          <img src={image2} className='links'/>
        </a>
      </div>
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </ul>
  );
}

export default Navigation;
