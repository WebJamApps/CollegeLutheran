import React from 'react';
import Faqs from '../HomepageData';

const WideAboutUs = () => (
  <div className="widescreenHomepage">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6" style={{ top: '0', paddingRight: '6px' }}>
          <p style={{ marginTop: '40px', marginBottom: '40px', fontSize: '18px' }}>
          College Lutheran Church is located in Southwest Virginia in the beautiful city of Salem, right next to Roanoke, VA.
          The church is situated on College Avenue, within easy walking distance of Roanoke College.
          College Lutheran Church is part of the Evangelical Lutheran Church in America (ELCA).
          </p>
          <Faqs />
        </div>

        <div className="col-md-6" style={{ padding: '1px', paddingRight: '0' }}>
          <div id="slideshow1" style={{ marginTop: '40px', marginRight: 0, textAlign: 'center' }}>
            <img
              style={{ borderRadius: '50%', width: '80%' }}
              alt="churchBuilding"
              src="https://dl.dropboxusercontent.com/s/8wcnwvc7s9iclj5/clcBuilding.png?dl=0"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WideAboutUs;
