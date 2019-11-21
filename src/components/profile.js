import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUserById } from "../utils/actions";
import AxiosWithAuth from "../utils/AxiosWithAuth";
import styled from "styled-components";

const ProfileInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  .userinfo {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
  i {
    width: 10rem;
  }
`;

const Profile = props => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const id = props.match.params.id;
    AxiosWithAuth()
      .get(`/users/${id}`)
      .then(res => {
        console.log("user", res.data);
        setUserProfile(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  if (!userProfile) {
    return <p>Loading User Profile...</p>;
  } else {
    return (
      <div>
        <i className="fas fa-user-circle fa-10x" />
        <div>
          <h1>{userProfile.user.username}</h1>
          <h2>{userProfile.user.location}</h2>
          <button
            onClick={() => props.history.push(`/update-user/${userProfile.id}`)}
          >
            update profile
          </button>
          <button onClick={() => props.history.push(`/add-tool`)}>
            add tool
          </button>
          {userProfile.tools.map(tool => {
            return (
              <div key={tool.id}>
                <p>{tool.name}</p>
                <p>${tool.price} /hr</p>
                <button
                  onClick={() => props.history.push(`/update-tool/${tool.id}`)}
                >
                  update
                </button>
                <button
                  onClick={() => props.history.push(`/delete-tool/${tool.id}`)}
                >
                  delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    userProfile: state.userProfile,
    isFetching: state.isFetching
  };
};

export default connect(mapStateToProps, { fetchUserById })(Profile);