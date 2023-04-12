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
  // console.log(sessionUser);
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
  };

  const manageSpots = () => {
    history.push('/spots/current')
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
          <>
            <ul>{user.username}</ul>
            <ul>{user.firstName} {user.lastName}</ul>
            <ul>{user.email}</ul>
            <ul>
              <div>
                <button onClick={manageSpots}>Manage Spots</button>
              </div>
              <button onClick={logout}>Log Out</button>
            </ul>
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
