import http from "k6/http";
import { check } from "k6";
import { Trend } from 'k6/metrics';
import { getAntiForgeryToken } from '../utils/getAntiForgeryToken'

const trend = new Trend('POST /ProducerSearch', true);

/**
 * 執行測試
 * @param {string} indexUrl 目標Url
 */
function run(indexUrl) {
    const traceCode = "1301002262";
    // Get ProducerSearch
    let response = http.get(`${indexUrl}/ProducerSearch`);
    check(response, { "status was 200": (r) => r.status == 200 });
    trend.add(response.timings.duration);
  
    const antiForgeryToken = getAntiForgeryToken(response);
    // Post ProducerSearch
    response = http.post(`${indexUrl}/ProducerSearch`, {
      __RequestVerificationToken: antiForgeryToken,
      ByTraceCode: traceCode,
    });
    check(response, { "status was 200": (r) => r.status == 200 });
    trend.add(response.timings.duration);
}

export default {
    trend
    , run
}
