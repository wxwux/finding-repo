import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchReadmeRequest } from "../../store/actions";
import { useParams } from "react-router-dom";
import Truncate from "react-truncate-html";

import { decodeToUnicode } from "../../helpers/base64";
import MarkdownIt from "markdown-it";

const Readme = ({ fetchReadmeRequest, readme }) => {
  const { owner, title } = useParams();
  const { data } = readme;

  useEffect(() => {
    fetchReadmeRequest({ owner, title });
  }, [fetchReadmeRequest, owner, title]);

  if (!data) {
    return "no data";
  } else {
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
  }
};

const mapDispatchToProps = { fetchReadmeRequest };
const mapStateToProps = ({ readme }) => ({ readme });

export default connect(mapStateToProps, mapDispatchToProps)(Readme);
