import http from "k6/http";
import { check } from "k6";
import { Trend } from 'k6/metrics';
import { getAntiForgeryToken } from '../utils/getAntiForgeryToken'

const trend = new Trend('POST /Matchmaking', true);

/**
 * 執行測試
 * @param {string} indexUrl 目標Url
 */
function run(indexUrl) {
    const matchmakingID = "167";
    // Get /Matchmaking/View/{MatchmakingID}
    let response = http.get(`${indexUrl}/Matchmaking/View/${matchmakingID}`);
    check(response, { "status was 200": (r) => r.status == 200 });
    trend.add(response.timings.duration);

    const keyWordMatchmaking = "火龍果";
    const antiForgeryToken = getAntiForgeryToken(response);
    // Post /Matchmaking
    response = http.post(`${indexUrl}/Matchmaking`, {
        __RequestVerificationToken: antiForgeryToken,
        BySubject: keyWordMatchmaking,
    });
    check(response, { "status was 200": (r) => r.status == 200 });
    trend.add(response.timings.duration);
}

export default {
    trend
    , run
}
