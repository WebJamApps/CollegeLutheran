import React from 'react';
import type { AdminDashboard } from '../../containers/AdminDashboard';

type PageProps = {comp:AdminDashboard;youthTitle:string;youthContent:string};
const YouthPageEditor = ({ comp, youthTitle, youthContent }:PageProps): JSX.Element => (
  <div className="horiz-scroll">
    <div className="material-content elevation3" style={{ width: '850px', margin: '30px auto' }}>
      <h5>Change Youthpage Section</h5>
      <form
        id="update-youthpage"
        style={{
          textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
        }}
      >
        {comp.forms.makeInput({
          type: 'text',
          label: 'Youth Title',
          isRequired: false,
          onChange: (evt) => comp.setState({ youthTitle: evt.target.value }),
          value: youthTitle,
          width: '90%',
        })}
        <label htmlFor="content">
          Content
          <br />
          {comp.controller.editor(youthContent, comp.controller.onChangeYouthContent)}
        </label>
        <div style={{ marginLeft: '60%', marginTop: '10px' }}>
          <button
            type="button"
            id="update-youthContent"
            disabled={false}
            onClick={(evt) => comp.controller.putAPI(evt, { title: youthTitle, comments: youthContent, type: 'youthPageContent' }, '/youth')}
          >
            Update Youthpage
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default YouthPageEditor;
