import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink } from "react-router-dom";
import { useLoggedin } from "../../context/LoggedIn";
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const { login, setLogin } = useLoggedin()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() =>{
    if(user){
      setLogin(true)
    }
  }, [])

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => {
    setShowMenu(false);
  }

  const logout = (e) => {
    e.preventDefault();
    setLogin(false)
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="allOfProfilePage">
      {login === true && (
        <NavLink className={'createNewSpotLink'} to={'/spots/new'}>Create a New Spot</NavLink>
      )}
      <button className="profileButton" onClick={openMenu}>
        <img className="threeBar" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///9NTU1CQkL5+fk3Nzc6Ojr09PRGRkbm5uZeXl7t7e3Y2NhKSkpDQ0M/Pz9HR0e5ubmLi4vFxcWcnJyvr6+jo6NhYWGRkZFxcXHBwcF/f3/e3t6np6dnZ2fOzs50dHQIRDPIAAACTUlEQVR4nO3d25KaQACEYc6IDoOIoqLI+7/lalmb7F4lF5vuCvV/b9AFzsGiZ5IEAAAAAAAAAAAAAPBnuY4j3uF8mRuV+XI+iFMemlgHpTo2V2XAoQypWoi97jH2UZ7vJU6qgMfSEvAZcdAE3LgCpmlxkyTsa1vC7qIImNvyvSJuBQl3mTFhfAgS7p0J2+PqEypGU2/CuyDhwzPdv8WDIGGlX7D9Vm8ECZOpswUMsyJg8ihsCUvFS/rUu8aadtEETJK5tQSsR9n2qVoc42l2USzZPp3KVjukhla1dfq0HZouZCp11wySeeK7qtqpbCx/tgEAAAAAAAAAAAAAAAAAAPygxzCPhco4n6/qHvBc1kH3lfCrBzyKvtN/G6KlB6wLeF57D/hu6wGfNQE3vs5M3EkSOnvAkvc0d3bXJD3gm6cS9KbpATsblhk94P8/4UmQcGftASt+h1tfSZYe8E/Z0QP+Z2rZ0vvimfS7VLcLtvSA46zsAR8zeQ9YMhV+sb2PRalTjCdDDziptiqVIR0AAAAAAAAAAAAAAAAAAFDLNyqWK0r2Swi1SgjLXvwF5qGN2k5CFztF5emX3tEijZPuMZruA24l96y+mIrOaZqJ2tzGzkyhKHZ5e0+S97Sy5UtF3TXvfcCKuvrV2bCU3CW7/pbs+hPeVn8vt/U+YMmZCtZzMTTrtpuxB6w52yQZ1r4uTZLFM9hki2yvn0+Wc6KE+8PnpNjETnrWV5ele2G+p+o6NU1QaZrpbmjK5nmlknMfMAAAAAAAAAAAAAD8hQ+XclG9TdczsgAAAABJRU5ErkJggg==" />
        <img className="grayPerson" src="data:image/jpeg;base64,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" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
