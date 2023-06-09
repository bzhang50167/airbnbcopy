import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from "react-router-dom";
import { useLoggedin } from "../../context/LoggedIn";
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()
  const ulRef = useRef();
  const sessionUser = useSelector(state => state.session.user);
  
  const { login, setLogin } = useLoggedin()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (user) {
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
    history.push('/')
  };

  const manageSpots = () => {
    closeMenu();
    history.push('/spots/current')
  }

  const manageReviews = () => {
    history.push('/reviews')
  }

  const manageBooking = () => {
    closeMenu();
    history.push('/allbookings')
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="allOfProfilePage">
      {sessionUser && (
        <NavLink className={'createNewSpotLink'} to={'/spots/new'}>Create a New Spot</NavLink>
      )}
      <button className="profileButton" onClick={openMenu}>
        <i className="fa-solid fa-bars"></i>
        <i className="fa-solid fa-user"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div>
            <ul className="fitInBoxPlease">Hello, {' '}{user.username}</ul>
            <ul className="fitInBoxPlease">{user.firstName} {user.lastName}</ul>
            <ul className="fitInBoxPlease">{user.email}</ul>
            <div>
              <button className="manageSpot" onClick={manageSpots}>Manage Spots</button>
            </div>
            {/* <div>
              <button className="manageSpot" onClick={manageReviews}>Manage Reviews</button>
            </div> */}
            <div>
              <button className="manageSpot" onClick={manageBooking}>Manage Bookings</button>
            </div>
            <button className="logoutButton" onClick={logout}>Log Out</button>
          </div>
        ) : (
          <div className="loginLogout">
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
          </div>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
