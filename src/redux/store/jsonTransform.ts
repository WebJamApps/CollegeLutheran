const makeTransform = (createTransform, JSOG) => createTransform(
  (inboundState, _key: any) => JSOG.encode(inboundState), // eslint-disable-line @typescript-eslint/no-unused-vars
  (outboundState, _key: any) => JSOG.decode(outboundState), // eslint-disable-line @typescript-eslint/no-unused-vars
);

export default { makeTransform };
