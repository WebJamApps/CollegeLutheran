import React from 'react';

function makeDropdown(htmlFor: string,
  labelText: any | null | undefined,
  value: string | number | readonly string[] | undefined,
  onChange: (arg0: React.ChangeEvent<HTMLSelectElement>, arg1: any) => void, options: any[]) {
  let key = 1;
  return (
    <label htmlFor={htmlFor} style={{ paddingTop: '12px' }} id={htmlFor}>
      {labelText}
      <br />
      <select id={htmlFor} value={value} onChange={(event) => onChange(event, htmlFor)}>
        <option id="blank-option" key="blank-option" value="">---</option>
        {// eslint-disable-next-line security/detect-object-injection
          options.map((cv: any) => { key += 1; return (<option id={cv[htmlFor]} key={key} value={cv[htmlFor]}>{cv[labelText]}</option>); })
        }
      </select>
    </label>
  );
}
function makeDataDropdown(htmlFor: string | undefined,
  labelText: React.ReactNode,
  value: string | number | readonly string[] | undefined,
  onChange: (arg0: React.ChangeEvent<HTMLSelectElement>, arg1: any) => void,
  options: any[], oValue: React.Key, dValue: React.Key) {
  return (
    <label htmlFor={htmlFor} style={{ paddingTop: '12px' }} id={htmlFor}>
      {labelText}
      <br />
      <select id={htmlFor} value={value} onChange={(event) => onChange(event, htmlFor)}>
        <option id="blank-option" key="blank-option" value="">---</option>
        {// eslint-disable-next-line security/detect-object-injection
          options.map((cv: any) => (<option id={cv[oValue]} key={cv[oValue]} value={cv[oValue]}>{cv[dValue]}</option>))
        }
      </select>
    </label>
  );
}
function makeInput(type: string | undefined,
  label: any | null | undefined, isRequired: boolean | undefined,
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined, value: any, width: any) {
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
}
const radioButtons = (showCaption: string, onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined) => (
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
export default {
  makeInput, makeDropdown, radioButtons, makeDataDropdown,
};
