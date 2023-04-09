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
          src='https://content.fortune.com/wp-content/uploads/2014/07/new-logos-airbnb.jpg?w=545'
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
