import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchReposRequest } from "../../store/actions";

const MainPage = ({ repos, fetchReposRequest }) => {
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const sendRequest = (e) => {
    e.preventDefault();
    console.log(title);
    setTitle("");

    fetchReposRequest(title);
  };

  const tableRows = repos.data.map((repo) => {
    return (
      <tr key={repo.id}>
        <td>{repo.name}</td>
        <td>
          <img src={repo.owner["avatar_url"]} width="100" alt="avatar" />
        </td>
        <td>datails</td>
      </tr>
    );
  });

  return (
    <>
      <form onSubmit={sendRequest}>
        <input
          placeholder="Enter the name"
          value={title}
          onChange={handleChange}
          type="text"
        />
        <button type="submit">Отправить</button>
      </form>
      <table>
        <tbody>{tableRows}</tbody>
      </table>
    </>
  );
};

const mapDispatchToProps = { fetchReposRequest };

const mapStateToProps = (state) => ({
  repos: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
