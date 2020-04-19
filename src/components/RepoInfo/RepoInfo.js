import React from "react";
import Readme from "../Readme"
import { getRelativeDate } from "../../helpers/dateTime";

const RepoInfo = ({ repo }) => {
  const relativeDate = date => {
    return getRelativeDate(new Date(date));
  }

  return (
    <>
      <h1>{repo.name}</h1>
      <h4>last changed: {relativeDate(repo["pushed_at"])}</h4>
      <h2>{repo.description}</h2>
      <table>
        <tbody>
          <tr>
            <td>forks: </td>
            <td>{repo.forks}</td>
          </tr>
          <tr>
            <td>issues: </td>
            <td>{repo["open_issues"]}</td>
          </tr>
          <tr>
            <td>watchers: </td>
            <td>{repo["subscribers_count"]}</td>
          </tr>
          <tr>
            <td>stars: </td>
            <td>{repo["stargazers_count"]}</td>
          </tr>
        </tbody>
      </table>
      <Readme />
    </>
  );
};

export default RepoInfo;
