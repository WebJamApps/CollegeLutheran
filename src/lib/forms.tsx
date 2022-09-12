interface IMkDropDownCv {
  [key: string]: string;
}

function makeDropdown(
  htmlFor: string,
  labelText: string,
  value: string,
  onChange: (arg0: React.ChangeEvent<HTMLSelectElement>, arg1: string) => void,
  options: { type: string, Category: string }[],
): JSX.Element {
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
  newLine?: boolean,
  type: string | undefined,
  label: string, isRequired: boolean | undefined,
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined, value: string, width: string
}
function makeInput(p: InputParams): JSX.Element {
  let fId = p.label && p.label.toLowerCase(), newLine = true;
  fId = fId.replace(/\s/g, '');
  if (p.newLine !== undefined && p.newLine === false) newLine = false;
  return (
    <label className="inquiryLabel" htmlFor={fId}>
      {p.isRequired ? '* ' : ''}
      {p.label}
      {newLine ? <br /> : null}
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

export default {
  makeInput, makeDropdown, makeDataDropdown,
};
