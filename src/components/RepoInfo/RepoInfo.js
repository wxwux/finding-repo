import React from "react";
import Readme from "../Readme"

const RepoInfo = ({ repo }) => {
  return (
    <>
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
