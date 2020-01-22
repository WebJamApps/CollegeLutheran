import React from 'react';

const makeDropdown = (htmlFor, labelText, value, onChange, options) => (
  <label htmlFor={htmlFor} style={{ paddingTop: '12px' }} id={htmlFor}>
    {labelText}
    <br />
    <select id={htmlFor} value={value} onChange={(event) => onChange(event, true)}>
      {
          options.map((cv) => <option id={cv} key={cv} value={cv}>{cv}</option>)
        }
    </select>
  </label>
);
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
