const makeTransform = (createTransform: (...args: any) => any, JSOG: any): any => createTransform(
  (inboundState: any, _key: string) => JSOG.encode(inboundState), // eslint-disable-line @typescript-eslint/no-unused-vars
  (outboundState: any, _key: string) => JSOG.decode(outboundState), // eslint-disable-line @typescript-eslint/no-unused-vars
);

export default { makeTransform };
