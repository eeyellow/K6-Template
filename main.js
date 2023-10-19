export { options } from './src/config'
//export { handleSummary } from './src/utils'

import TrendCollection from './src/trend'

export default function () {
  const indexUrl = "https://qrtracegcb.lingcheng.tw";
  
  Object.keys(TrendCollection).forEach(key => {
    TrendCollection[key].run(indexUrl);
  });
}
