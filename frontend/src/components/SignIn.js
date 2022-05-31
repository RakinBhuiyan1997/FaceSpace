import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
const SignIn = () => {
  const { setCurrentUser, setLoggedIn } = useContext(CurrentUserContext);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const history = useHistory();

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

  const userLogin = (e) => {
    //e.preventDefault prevents teh form from autosubmitting
    e.preventDefault();
    const set = users.filter((val) => {
      return val.name.toLowerCase() === name.toLowerCase();
    });
    setCurrentUser(Object.assign({}, ...set));
    setLoggedIn(true);
    history.push("/");
  };

  //Acess alll the names of the FaceSpace users
  //Once accessed, create an event handler in which when we click on Submit, the Sign In button turns into "Howdy ${userName}"
  //Create a CurrentUserContext to be used in all of our components
  //From their, we must conditionally render banners on who their friends are IF someone is logged in
  return (
    <>
      <Container>
        <Form id="loginForm" onSubmit={userLogin}>
          <Input
            type="text"
            placeholder="Enter your name!"
            form="loginForm"
            id="userName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </>
  );
};

const Input = styled.input`
  width: 243px;
  margin-bottom: 10px;
  border: none;
`;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("/images/facespace_bg.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Button = styled.button`
  width: 250px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #cc5500;
  color: white;
  font-weight: bold;
`;
const Form = styled.form`
  width: 270px;
  height: 90px;
  margin-left: 550px;
  border: 10px solid rgb(248, 243, 235, 0.2);
`;
export default SignIn;
