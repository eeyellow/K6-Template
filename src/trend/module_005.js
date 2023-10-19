import http from "k6/http";
import { check } from "k6";
import { Trend } from 'k6/metrics';
import { getAntiForgeryToken } from '../utils/getAntiForgeryToken'

const trend = new Trend('GET /ProducerSearch/Detail/_batchID', true);

/**
 * 執行測試
 * @param {string} indexUrl 目標Url
 */
function run(indexUrl) {
    const batchID = "8499";
    // Get ProducerSearchDetail
    const response = http.get(`${indexUrl}/ProducerSearch/Detail/${batchID}`);
    check(response, { "status was 200": (r) => r.status == 200 });
    trend.add(response.timings.duration);
}

export default {
    trend
    , run
}
