import http from "k6/http";
import { check } from "k6";
import { Trend } from 'k6/metrics';
import { getAntiForgeryToken } from '../utils/getAntiForgeryToken'

const trend = new Trend('POST /DisableData', true);

/**
 * 執行測試
 * @param {string} indexUrl 目標Url
 */
function run(indexUrl) {
    // Get DisableData
    let response = http.get(`${indexUrl}/DisableData`);
    check(response, { "status was 200": (r) => r.status == 200 });
    trend.add(response.timings.duration);

    const traceCodeDisable = "1101000158";
    const antiForgeryToken = getAntiForgeryToken(response);
    // Post DisableData
    response = http.post(`${indexUrl}/DisableData`, {
        __RequestVerificationToken: antiForgeryToken,
        ByTraceCode: traceCodeDisable,
    });
    check(response, { "status was 200": (r) => r.status == 200 });
    trend.add(response.timings.duration);
}

export default {
    trend
    , run
}
