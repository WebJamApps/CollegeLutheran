import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DefaultYouthContent from './YouthContent';
import mapStoreToProps from '../../redux/mapStoreToProps';

export class Youth extends Component {
  constructor(props) {
    super(props);
    this.children = props.children;
  }

  componentDidMount() { document.title = 'Youth Ministry | College Lutheran Church'; }

  render() {
    const { youthPics } = this.props;
    return (
      <DefaultYouthContent youthPics={youthPics} />
    );
  }
}

Youth.defaultProps = { youthPics: [] };
Youth.propTypes = {
  youthPics: PropTypes.arrayOf(PropTypes.shape({
    comments: PropTypes.string,
  })),
  children: PropTypes.node.isRequired,
};

export default connect(mapStoreToProps, null)(Youth);
