import React, { useState } from 'react';
import styled from 'styled-components';
import avatar1 from '../../img/avatar1.png';
import { menuItems } from '../../utils/menuItems';
import { FaSignOutAlt } from 'react-icons/fa';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { FaHandPaper } from 'react-icons/fa'; // Importing the waving hand icon

function Navigation({ active, setActive }) {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <NavStyled>
      <div className="user-con">
        <img src={avatar1} alt="" />
        {user && (
          <div className="text">
            <div className="greeting">
              <h2>Hello</h2>
              <FaHandPaper className="hand-icon" />
            </div>
            <h3>{user.username}</h3>
            <p>Your Expenditure</p>
          </div>
        )}
        {!user && (
          <div className="text">
            <div className="greeting">
              <h2>Hello</h2>
              <FaHandPaper className="hand-icon" />
            </div>
            <h3>Guest</h3>
            <p>Your Expenditure</p>
          </div>
        )}
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => (
          item.id === 0 ? (
            <item.Component key={item.id}>
              {item.icon}
              <span>{item.title}</span>
            </item.Component>
          ) : (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? 'active' : ''}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          )
        ))}
      </ul>
      <div className="bottom-nav">
        <ul>
          <li onClick={handleLogout}>
            <FaSignOutAlt /> Sign Out
          </li>
        </ul>
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: PeachPuff; /* Added coral background color */
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    .text {
      .greeting {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        h2 {
          margin: 0;
          color: rgba(34, 34, 96, 1);
        }
        .hand-icon {
          font-size: 1.4rem;
          color: rgba(34, 34, 96, 1);
        }
      }
      h3 {
        margin: 0;
        color: rgba(34, 34, 96, 1);
      }
      p {
        color: rgba(34, 34, 96, 0.6);
      }
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: bold; /* Make menu items bold */
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }

  .bottom-nav {
    ul {
      list-style-type: none;
      padding: 0;
      li {
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        color: rgba(34, 34, 96, 0.6);
        font-weight: 500;
        i {
          margin-right: 0.5rem;
          font-size: 1.4rem;
        }
        &:hover {
          color: rgba(34, 34, 96, 1);
          i {
            color: rgba(34, 34, 96, 1);
          }
        }
      }
    }
  }
`;

export default Navigation;
