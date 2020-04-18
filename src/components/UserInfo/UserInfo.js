import React from "react";

const UserInfo = ({ user }) => {
  return (
    <>
      <img src={user["avatar_url"]} alt={`${user.login} avatar`} />
      <h1>{user.login}</h1>
    </>
  );
};

export default UserInfo;
