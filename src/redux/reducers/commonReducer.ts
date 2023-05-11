import type { Ibook } from 'src/providers/utils';

const reducer = (key:string, caseString:string, initialState: Record<string, unknown>) => (
  state = initialState,
  action: { type: string; data: Ibook; },
): Record<string, unknown> => {
  switch (action.type) {
    case caseString: return key === 'homeContent' ? { ...state, homeContent: action.data } : { ...state, youthContent: action.data };
    default: return state;
  }
};
export default reducer;
