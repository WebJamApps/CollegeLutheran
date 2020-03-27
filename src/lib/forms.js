import React from 'react';

const makeDropdown = (htmlFor, labelText, value, onChange, options) => {
  let key = 1;
  return (
    <label htmlFor={htmlFor} style={{ paddingTop: '12px' }} id={htmlFor}>
      {labelText}
      <br />
      <select id={htmlFor} value={value} onChange={(event) => onChange(event, htmlFor)}>
        <option id="blank-option" key="blank-option" value="">---</option>
        {// eslint-disable-next-line security/detect-object-injection
          options.map((cv) => { key += 1; return (<option id={cv[htmlFor]} key={key} value={cv[htmlFor]}>{cv[labelText]}</option>); })
        }
      </select>
    </label>
  );
};
const makeInput = (type, label, isRequired, onChange, value, width) => {
  let fId = label.toLowerCase();
  fId = fId.replace(/\s/g, '');
  fId = fId.split('(');
  [fId] = fId;
  return (
    <label className="inquiryLabel" htmlFor={fId}>
      {isRequired ? '* ' : ''}
      {label}
      <br />
      <input
        style={{ paddingLeft: 0, minWidth: 'inherit', width }}
        id={fId}
        type={type}
        name={fId}
        onChange={onChange}
        required={isRequired}
        value={value || ''}
      />
    </label>
  );
};
const radioButtons = (showCaption, onChange) => (
  <div>
    <label htmlFor="hide-caption" style={{ position: 'relative', display: 'inline-block', width: '130px' }}>
      <input
        id="hide-caption"
        type="radio"
        name="hide-caption"
        value="hideCaption"
        checked={showCaption !== 'showCaption'}
        onChange={onChange}
        className="form-check-input"
        style={{ minWidth: 0 }}
      />
      Hide Caption
    </label>
    <label htmlFor="show-caption" style={{ position: 'relative', display: 'inline-block', width: '130px' }}>
      <input
        type="radio"
        name="show-caption"
        value="showCaption"
        checked={showCaption === 'showCaption'}
        onChange={onChange}
        className="form-check-input"
        style={{ minWidth: 0 }}
      />
      Show Caption
    </label>
  </div>
);
export default { makeInput, makeDropdown, radioButtons };
