import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import "./HomePage.css";

const HomePage = () => {
  const { currentUser, loggedIn } = useContext(CurrentUserContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
      })
      .catch((error) => {
        console.log("This is an error");
      });
  }, []);
  const currentUserFriends = currentUser.friends;

  return (
    <>
      <h2>All Facespace Members</h2>
      <Container>
        {users.map((user) => {
          const url = user.avatarUrl;
          const userId = user.id;
          let num = Math.floor(Math.random() * 10000000);
          return (
            <div key={num} className="hover">
              {!loggedIn ? (
                <Link id="profileLink" to={`/api/users/${userId}`}>
                  <img src={url} className="hoverPic" alt="User Images" />
                </Link>
              ) : (
                <Link id="profileLink" to={`/api/users/${userId}`}>
                  <div className="card">
                    {currentUserFriends.includes(userId) && (
                      <div className="ribbon">
                        <span>Friend</span>
                      </div>
                    )}

                    <img src={url} className="hoverPic" alt="User Images" />
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  gap: 10px;
  width: var(--max-content-width);
  padding-left: var(--page-horizontal-padding);
  padding-right: var(--page-horizontal-padding);
`;

export default HomePage;
