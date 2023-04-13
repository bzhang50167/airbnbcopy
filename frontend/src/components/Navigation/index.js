import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useLoggedin } from '../../context/LoggedIn';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

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
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </ul>
  );
}

export default Navigation;
