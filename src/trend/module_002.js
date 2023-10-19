import http from "k6/http";
import { check } from "k6";
import { Trend } from 'k6/metrics';
import { getAntiForgeryToken } from '../utils/getAntiForgeryToken'

const trend = new Trend('GET /blog/_traceCode', true);

/**
 * 執行測試
 * @param {string} indexUrl 目標Url
 */
function run(indexUrl) {
    // Get blog
    const traceCode = "1301002262";
    const LogID = "33543";
    let response = http.get(`${indexUrl}/blog/${traceCode}?logID=${LogID}`);
    check(response, { "status was 200": (r) => r.status == 200 });
    trend.add(response.timings.duration);

    // Get blog
    response = http.get(`${indexUrl}/blog/${traceCode}`);
    check(response, { "status was 200": (r) => r.status == 200 });
    trend.add(response.timings.duration);
}

export default {
    trend
    , run
}
