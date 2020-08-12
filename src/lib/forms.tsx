import React from 'react';

interface IMkDropDownCv {
  [key: string]: string;
}

function makeDropdown(htmlFor: string,
  labelText: string,
  value: string,
  onChange: (arg0: React.ChangeEvent<HTMLSelectElement>, arg1: string) => void,
  options: { type: string, Category: string }[]): JSX.Element {
  let key = 1;
  return (
    <label htmlFor={htmlFor} style={{ paddingTop: '12px' }} id={htmlFor}>
      {labelText}
      <br />
      <select id={htmlFor} value={value} onChange={(event) => onChange(event, htmlFor)}>
        <option id="blank-option" key="blank-option" value="">---</option>
        {// eslint-disable-next-line security/detect-object-injection
          options.map((cv: IMkDropDownCv) => { key += 1; return (<option id={cv[htmlFor]} key={key} value={cv[htmlFor]}>{cv[labelText]}</option>); })
        }
      </select>
    </label>
  );
}
export interface DataDropParams {
  htmlFor: string,
  labelText: string,
  value: string,
  onChange: (arg0: React.ChangeEvent<HTMLSelectElement>, arg1: string) => void,
  options: Record<string, string>[], oValue: string, dValue: string
}
function makeDataDropdown(p: DataDropParams): JSX.Element {
  return (
    <label htmlFor={p.htmlFor} style={{ paddingTop: '12px' }} id={p.htmlFor}>
      {p.labelText}
      <br />
      <select id={p.htmlFor} value={p.value} onChange={(event) => p.onChange(event, p.htmlFor)}>
        <option id="blank-option" key="blank-option" value="">---</option>
        {// eslint-disable-next-line security/detect-object-injection
          p.options.map((cv) => (<option id={cv[p.oValue]} key={cv[p.oValue]} value={cv[p.oValue]}>{cv[p.dValue]}</option>))
        }
      </select>
    </label>
  );
}
export interface InputParams {
  type: string | undefined,
  label: string, isRequired: boolean | undefined,
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined, value: string, width: string
}
function makeInput(p: InputParams): JSX.Element {
  let fId = p.label && p.label.toLowerCase();
  fId = fId.replace(/\s/g, '');
  // fId = fId.split('(');
  // [fId] = fId;
  return (
    <label className="inquiryLabel" htmlFor={fId}>
      {p.isRequired ? '* ' : ''}
      {p.label}
      <br />
      <input
        style={{ paddingLeft: 0, minWidth: 'inherit', width: p.width }}
        id={fId}
        type={p.type}
        name={fId}
        onChange={p.onChange}
        required={p.isRequired}
        value={p.value || ''}
      />
    </label>
  );
}
const radioButtons = (showCaption: string, onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined): JSX.Element => (
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
