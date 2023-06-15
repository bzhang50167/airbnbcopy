import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useLoggedin } from '../../context/LoggedIn';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Navigation({ isLoaded }){
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
      handleSearch(e);
    }
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
        <input
        type='search'
        placeholder='search...'
        onKeyDown={handleKeyPress}
        onChange={e => setSearchQuery(e.target.value)}
        />
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
