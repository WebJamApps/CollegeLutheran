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
export default { makeInput, makeDropdown };
