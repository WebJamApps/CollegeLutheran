/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ibook } from 'src/providers/utils';

const reducer = (key: string, caseString: string, initialState: any) => (
  state: any = initialState,
  action: { type: string; data: Ibook },
): any => {
  switch (action.type) {
    case caseString: return key === 'homeContent' ? { ...state, homeContent: action.data } : { ...state, youthContent: action.data };
    default: return state;
  }
};
export default reducer;
