import React from 'react';
import Faqs from '../HomepageData';

const NarrowAboutUs = () => (
  <div className="notWidescreen" style={{ marginTop: '40px' }}>
    <div style={{ padding: '10px', marginBottom: '-20px' }}>
      <p style={{ marginTop: '-5px', marginBottom: '40px', fontSize: '18px' }}>
College Lutheran Church is located in Southwest Virginia in the beautiful city of Salem, right next to Roanoke, VA.
The church is situated on College Avenue, within easy walking distance of Roanoke College.
College Lutheran Church is part of the Evangelical Lutheran Church in America (ELCA).
      </p>
      <Faqs />
    </div>
  </div>
);

export default NarrowAboutUs;
