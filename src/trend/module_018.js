import http from "k6/http";
import { check } from "k6";
import { Trend } from 'k6/metrics';
import { getAntiForgeryToken } from '../utils/getAntiForgeryToken'

const trend = new Trend('POST /News/PublicNews', true);

/**
 * 執行測試
 * @param {string} indexUrl 目標Url
 */
function run(indexUrl) {
    const newsID = "107";
    // Get /News/PublicNews/{NewsID}
    let response = http.get(`${indexUrl}/News/PublicNews/${newsID}`);
    check(response, { "status was 200": (r) => r.status == 200 });
    trend.add(response.timings.duration);

    const keyWordNews = "Google";
    const antiForgeryToken = getAntiForgeryToken(response);
    // Post PublicNews
    response = http.post(`${indexUrl}/News/PublicNews`, {
        __RequestVerificationToken: antiForgeryToken,
        ByTitle: keyWordNews,
    });
    check(response, { "status was 200": (r) => r.status == 200 });
    trend.add(response.timings.duration);
}

export default {
    trend
    , run
}
