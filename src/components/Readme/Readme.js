import React from "react";
import { connect } from "react-redux";
import { fetchReadmeRequest } from "../../store/actions";
import Truncate from "react-truncate-html";

import { decodeToUnicode } from "../../helpers/base64";
import MarkdownIt from "markdown-it";

import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./ReadmeUITheme";

const Readme = ({ readme }) => {
  const { data, pending } = readme;
  const classes = useStyles();

  if (pending) {
    return (
      <div className={classes.loader}>
        <CircularProgress />
      </div>
    );
  }

  if (!data) return "No readme was provided";

  const content = decodeToUnicode(data.content);
  const markdown = new MarkdownIt({
    html: true,
  });
  const markup = markdown.render(content);

  return (
    <Truncate
      lines={30}
      ellipsis={"<span>read more</span>"}
      dangerouslySetInnerHTML={{
        __html: markup,
      }}
    />
  );
};

const mapDispatchToProps = { fetchReadmeRequest };
const mapStateToProps = ({ readme }) => ({ readme });

export default connect(mapStateToProps, mapDispatchToProps)(Readme);
