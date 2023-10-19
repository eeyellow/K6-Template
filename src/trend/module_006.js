import http from "k6/http";
import { check } from "k6";
import { Trend } from 'k6/metrics';
import { getAntiForgeryToken } from '../utils/getAntiForgeryToken'

const trend = new Trend('POST /ProducerSearch/BatchIndex', true);

/**
 * 執行測試
 * @param {string} indexUrl 目標Url
 */
function run(indexUrl) {
    // Get BatchIndex
    let response = http.get(`${indexUrl}/ProducerSearch/BatchIndex`);
    check(response, { "status was 200": (r) => r.status == 200 });
    trend.add(response.timings.duration);

    const antiForgeryToken = getAntiForgeryToken(response);
    const traceCode = "1301002262";
    // Post BatchIndex
    response = http.post(`${indexUrl}/ProducerSearch/BatchIndex`, {
      __RequestVerificationToken: antiForgeryToken,
      ByBatchCode: traceCode,
    });
    check(response, { "status was 200": (r) => r.status == 200 });
    trend.add(response.timings.duration);
}

export default {
    trend
    , run
}
