import { useState } from 'react';

export const useFnState = (func) => {
  const [state, setState] = useState(() => func);

  const setFunc = (fn) => setState(() => fn);

  return [state, setFunc];
};
