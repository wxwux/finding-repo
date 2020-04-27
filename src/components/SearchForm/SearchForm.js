import React from "react";
import PropTypes from "prop-types";
import i18n from "../../../i18n";

import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import { withStyles } from "@material-ui/core/styles";
import styles from "./SearchFormUITheme";

class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      debouncer: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.lastSearchedItem !== prevProps.lastSearchedItem) {
      this.setState({
        title: this.props.lastSearchedItem,
      });
    }
  }

  deboncedFunction = (fn, ms) => {
    if (Boolean(this.state.debouncer)) {
      clearTimeout(this.state.debouncer);
    }

    this.setState({
      debouncer: setTimeout(fn, ms),
    });
  };

  handleChange = (e) => {
    const sendRequest = () => {
      this.deboncedFunction(
        this.props.sendRequest.bind(this, this.state.title),
        1000
      );
    };

    this.setState(
      {
        title: e.target.value.trim(),
      },
      sendRequest
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.debouncer) {
      clearTimeout(this.state.debouncer);
    }
    this.props.sendRequest(this.state.title);
  };

  render() {
    const { classes, hasError, disabled } = this.props;
    const { title } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={classes.form}>
        <div className={`${classes.search} ${hasError ? classes.error : ""}`}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder={i18n.ui("search.string", "Enter the name")}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            disabled={disabled}
            autoFocus={true}
            value={title}
            onInput={this.handleChange}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </form>
    );
  }
}

SearchBar.propTypes = {
  lastSearchedItem: PropTypes.string,
  hasError: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default withStyles(styles, { withTheme: true })(SearchBar);
