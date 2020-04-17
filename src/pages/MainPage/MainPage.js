import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchReposByQueryRequest } from "../../store/actions";
import Paginator from "../../components/Paginator";
import { queryConstructor } from "../../helpers/queries";

const MainPage = ({ repos, fetchReposByQueryRequest }) => {
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const sendRequest = (e) => {
    e.preventDefault();
    setTitle("");

    const query = queryConstructor.byTitle(title);
    fetchReposByQueryRequest(query);
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
      <h1>FINDING REPO</h1>
      <form onSubmit={sendRequest}>
        <input
          placeholder="Enter the name"
          value={title}
          onChange={handleChange}
          type="text"
        />
        <button type="submit">Отправить</button>
      </form>
      <Paginator />
      <table>
        <tbody>{tableRows}</tbody>
      </table>
    </>
  );
};

const mapDispatchToProps = { fetchReposByQueryRequest };

const mapStateToProps = (state) => ({
  repos: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
