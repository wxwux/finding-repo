import React from "react";

import Fab from "@material-ui/core/Fab";

import useStyles from "./SearchHistoryUITheme";

const SearchHistory = ({ searchHistory, findRepoByTitle }) => {
  const classes = useStyles();

  const historyItems = searchHistory.map((title) => (
    <Fab
      key={title}
      size="small"
      variant="extended"
      color="secondary"
      aria-label={title}
      className={classes.item}
      onClick={() => findRepoByTitle(title)}
    >
      {title}
    </Fab>
  ));
  return (
    <div id="search-history" className={classes.container}>
      {historyItems}
    </div>
  );
};

export default SearchHistory;
