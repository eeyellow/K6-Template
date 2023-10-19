import http from "k6/http";
import { check } from "k6";
import { Trend } from 'k6/metrics';
import { getAntiForgeryToken } from '../utils/getAntiForgeryToken'

const trend = new Trend('GET /Apply', true);

/**
 * 執行測試
 * @param {string} indexUrl 目標Url
 */
function run(indexUrl) {
    const response = http.get(`${indexUrl}/Apply`);
    check(response, { "status was 200": (r) => r.status == 200 });
    trend.add(response.timings.duration);
}

export default {
    trend
    , run
}
