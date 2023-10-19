import http from "k6/http";
import { check } from "k6";
import { Trend } from 'k6/metrics';
import { getAntiForgeryToken } from '../utils/getAntiForgeryToken'

const trend = new Trend('POST /ProducerArea/AvailableCropIndex', true);

/**
 * 執行測試
 * @param {string} indexUrl 目標Url
 */
function run(indexUrl) {
    // Get /ProducerArea/AvailableCropIndex
    let response = http.get(`${indexUrl}/ProducerArea/AvailableCropIndex`);
    check(response, { "status was 200": (r) => r.status == 200 });
    trend.add(response.timings.duration);

    const keyWordAvailableCrop = "山蘇";
    const antiForgeryToken = getAntiForgeryToken(response);
    // Post /ProducerArea/AvailableCropIndex
    response = http.post(`${indexUrl}/ProducerArea/AvailableCropIndex`, {
        __RequestVerificationToken: antiForgeryToken,
        ByKeyWord: keyWordAvailableCrop,
    });
    check(response, { "status was 200": (r) => r.status == 200 });
    trend.add(response.timings.duration);
}

export default {
    trend
    , run
}
