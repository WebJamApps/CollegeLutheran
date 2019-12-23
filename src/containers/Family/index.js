import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DefaultFamilyContent from './FamilyContent';
import mapStoreToProps from '../../redux/mapStoreToProps';

export class Family extends Component {
  constructor(props) {
    super(props);
    this.children = props.children;// eslint-disable-line react/prop-types
  }

  componentDidMount() {
    document.title = 'Children & Families | College Lutheran Church';
  }

  render() {
    const { familyPics } = this.props;
    return (
      <DefaultFamilyContent familyPics={familyPics} />
    );
  }
}

Family.defaultProps = { familyPics: [] };
Family.propTypes = {
  familyPics: PropTypes.arrayOf(PropTypes.shape({
    comments: PropTypes.string,
  })),
};

export default connect(mapStoreToProps, null)(Family);
