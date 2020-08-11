const makeTransform = (createTransform: (arg0: (inboundState: any, _key: string | number) => any,
  arg1: (outboundState: any, _key: string | number) => any) => any, JSOG: any) => createTransform(
  (inboundState: any, _key: number | string) => JSOG.encode(inboundState), // eslint-disable-line @typescript-eslint/no-unused-vars
  (outboundState: any, _key: number | string) => JSOG.decode(outboundState), // eslint-disable-line @typescript-eslint/no-unused-vars
);

export default { makeTransform };
