import React, { useState } from "react";
import { connect } from "react-redux";

import { fetchReposByQueryRequest } from "../../store/actions";
import { queryConstructor } from "../../helpers/queries";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Paginator from "../../components/Paginator";
import Button from "@material-ui/core/Button";

import "./MainPage.css";
import useStyles from "./MainPageUITheme";

const MainPage = ({ repos, fetchReposByQueryRequest }) => {
  const [title, setTitle] = useState("");
  const classes = useStyles();

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
    <div className="app-container">
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              FINDING REPO
            </Typography>
            <form onSubmit={sendRequest} className={classes.form}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Enter the name"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={title}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <Button variant="contained" type="submit">
                Send
              </Button>
            </form>
          </Toolbar>
        </AppBar>
      </div>
      <Paginator />
      <table>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

const mapDispatchToProps = { fetchReposByQueryRequest };

const mapStateToProps = (state) => ({
  repos: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
