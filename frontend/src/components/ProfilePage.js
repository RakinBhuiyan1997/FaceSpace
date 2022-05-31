import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import "./ProfilePage.css";
const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [friendArray, setFriendArrray] = useState([]);
  const { userId } = useParams();

  // const getUser = async () => {
  //   const res = await fetch(`/api/users/${userId}`);
  //   const json = await res.json();
  //   setUser(json.data);
  // };

  const getFriends = async () => {
    const res = await fetch(`/api/users/${userId}`);
    const json = await res.json();
    setUser(json.data);
    const res2 = await fetch("/api/users");

    const json2 = await res2.json();
    const newArray = json2.data.filter((val) => {
      console.log({ user, val });
      return json.data.friends.includes(val.id);
    });
    console.log({ HERE: "filter", newArray });
    setFriendArrray(newArray);
  };
  const runIt = async () => {
    try {
      // await getUser();
      // if (!!user.friends) {
      await getFriends();
      setLoaded(true);
      // }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    runIt();
  }, [userId]);

  //["12342314", "2345342", "234523452345"]
  //[{id: "12342314", key2: "something"}, {id: "2345342", key2: "something"} ]
  //[{}]

  return (
    <>
      {!!loaded && (
        <div>
          <Banner src="/images/facespace_bg.jpg" />
          <div className="profileWrapper">
            <div className="leftColumn">
              <img
                className="profileImage"
                src={user.avatarUrl}
                alt="Profile Image"
              />
            </div>
            <div className="rightColumn">
              <h1 className="profileName">{user.name}</h1>
            </div>
          </div>

          <div className="userContainer">
            <h2>{user.name}'s Friends</h2>
          </div>
          <div className="friendDiv">
            {friendArray.map((val) => {
              const userId = val.id;
              return (
                // <Link id="profileLink" to={`/api/users/${userId}`}>
                <div className="friendProfileContainer" key={val.id}>
                  <img
                    className="friendProfile"
                    key={val.id}
                    src={val.avatarUrl}
                    alt="Friend Pictures"
                  />
                  <div className="friendName">{val.name}</div>
                </div>
                // </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

const Banner = styled.img`
  height: 350px;
  position: relative;
  width: 100%;
  object-fit: cover;
`;

const Border = styled.div`
  border: solid;
  color: var(--primary-color);
`;

// const Container = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   align-content: center;
//   gap: 10px;
//   width: var(--max-content-width);
//   padding-left: var(--page-horizontal-padding);
//   padding-right: var(--page-horizontal-padding);
// `;

export default ProfilePage;
