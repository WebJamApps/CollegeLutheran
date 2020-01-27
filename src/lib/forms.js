import React from 'react';

const makeDropdown = (htmlFor, labelText, value, onChange, options, oValue, dValue) => (
  <label htmlFor={htmlFor} style={{ paddingTop: '12px' }} id={htmlFor}>
    {labelText}
    <br />
    <select id={htmlFor} value={value} onChange={(event) => onChange(event, 'forumId')}>
      <option id="blank-option" key="blank-option" value="">---</option>
      {// eslint-disable-next-line security/detect-object-injection
          options.map((cv) => (<option id={cv[oValue]} key={cv[oValue]} value={cv[oValue]}>{cv[dValue]}</option>))
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
