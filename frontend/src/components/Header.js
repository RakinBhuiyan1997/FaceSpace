import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
const HeaderBar = () => {
  const { currentUser, loggedIn } = useContext(CurrentUserContext);

  return (
    <Header>
      <StyledLink to="/">
        <Title>FaceSpace</Title>
      </StyledLink>
      <Span>
        {!loggedIn ? (
          <StyledLink to="/SignIn">
            <LogIn>SignIn</LogIn>
          </StyledLink>
        ) : (
          <User>Howdy {currentUser.name}</User>
        )}
      </Span>
    </Header>
  );
};

const Header = styled.header`
  height: var(--header-height);
  background-color: var(--primary-color);
`;
const Title = styled.h1`
  color: white;
  font-size: 30px;
`;
const Span = styled.span`
  float: right;
`;
const LogIn = styled.h1`
  text-align: right;

  color: white;
  font-size: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const User = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

export default HeaderBar;
