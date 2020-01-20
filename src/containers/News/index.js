import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DefaultNewsContent from './NewsContent';
import mapStoreToProps from '../../redux/mapStoreToProps';

export class News extends Component {
  constructor(props) {
    super(props);
    this.children = props.children;// eslint-disable-line react/prop-types
  }

  componentDidMount() { document.title = 'News & Forum | College Lutheran Church'; }

  render() {
    const { books } = this.props;
    return (
      <div className="page-content">
        <DefaultNewsContent books={books} />
      </div>
    );
  }
}

News.defaultProps = { books: [] };
News.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    comments: PropTypes.string,
  })),
};

export default connect(mapStoreToProps, null)(News);
