import React from "react";
import { connect } from "react-redux";
import { parseSearchQueryFromLink } from "../../helpers/queries";
import { fetchReposByQueryRequest } from "../../store/actions";

const Paginator = ({ pagination, fetchReposByQueryRequest }) => {
  const navigate = (url) => {
    const query = parseSearchQueryFromLink(url);
    fetchReposByQueryRequest(query);
  };

  const buttons = pagination.map((page, ndx) => {
    return (
      <button key={ndx} onClick={() => navigate(page.url)} type="button">
        {page.rel}
      </button>
    );
  });
  return <>{buttons}</>;
};

const mapStateToProps = (state) => ({
  pagination: state.pagination,
});

const mapDispatchToProps = { fetchReposByQueryRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Paginator);
