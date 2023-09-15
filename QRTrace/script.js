import http from "k6/http";
import { check } from "k6";
import { getAntiForgeryToken } from "./util.js";
// import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
// import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.3/index.js";
import { Trend } from 'k6/metrics';

// 為每個 request 設定一個 Trend
const indexResTrend = new Trend('_indexRes_duration');
const blogByLogIDResTrend = new Trend('_blogByLogIDRes_duration');
const blogResTrend = new Trend('_blogRes_duration');
const mapResTrend = new Trend('_mapRes_duration');
const producerSearchResTrend = new Trend('_producerSearchRes_duration');
const producerSearchDetailResTrend = new Trend('_producerSearchDetailRes_duration');
const batchIndexResTrend = new Trend('_batchIndexRes_duration');
const postBatchIndexResTrend = new Trend('_postBatchIndexRes_duration');
const pageResTrend = new Trend('_pageRes_duration');
const linksResTrend = new Trend('_linksRes_duration');
const privacyResTrend = new Trend('_privacyRes_duration');
const openDeclarationResTrend = new Trend('_openDeclarationRes_duration');
const faqResTrend = new Trend('_faqRes_duration');
const postFaqResTrend = new Trend('_postFaqRes_duration');
const disableDataResTrend = new Trend('_disableDataRes_duration');
const postDisableDataResTrend = new Trend('_postDisableDataRes_duration');
const applyResTrend = new Trend('_applyRes_duration');
const applyQueryResTrend = new Trend('_applyQueryRes_duration');
const forgetResTrend = new Trend('_forgetRes_duration');
const reportResTrend = new Trend('_reportRes_duration');
const publicNewsResTrend = new Trend('_publicNewsRes_duration');
const publicNewsByIDResTrend = new Trend('_publicNewsByIDRes_duration');
const postPublicNewsResTrend = new Trend('_postPublicNewsRes_duration');
const producerAreaResTrend = new Trend('_producerAreaRes_duration');
const newsIndexResTrend = new Trend('_newsIndexRes_duration');
const newsIndexByIDResTrend = new Trend('_newsIndexByIDRes_duration');
const availableCropIndexResTrend = new Trend('_availableCropIndexRes_duration');
const postAvailableCropIndexResTrend = new Trend('_postAvailableCropIndexRes_duration');
const fileDownloadResTrend = new Trend('_fileDownloadRes_duration');
const matchmakingResTrend = new Trend('_matchmakingRes_duration');
const matchmakingViewResTrend = new Trend('_matchmakingViewRes_duration');
const postMatchmakingResTrend = new Trend('_postMatchmakingRes_duration');
const auditorAreaResTrend = new Trend('_auditorAreaRes_duration');
const onlineAccountApplyResTrend = new Trend('_onlineAccountApplyRes_duration');




// 壓測情境設定
export const options = {
  discardResponseBodies: true,
  // scenarios: {
  //   contacts: {
  //     executor: 'ramping-vus',
  //     startVUs: 10,
  //     stages: [
  //       { duration: '13m30s', target: 200 },
  //       { duration: '1m', target: 100 },
  //     ],
  //   },
  // },

  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 10,
      stages: [
        { duration: '30s', target: 50 },
      ],
    },
  },
};

// 壓測主程式
export default function () {
  const indexUrl = "https://qrtracegcb.lingcheng.tw";

  testIndex(indexUrl);

  testBlog(indexUrl);

  testMap(indexUrl);

  testProducerSearch(indexUrl);

  testProducerSearchDetail(indexUrl);

  testBatchIndex(indexUrl);

  testPage(indexUrl);

  testFAQ(indexUrl);

  testDisableData(indexUrl);

  testApply(indexUrl);

  testReport(indexUrl);

  testNews(indexUrl);

  testProducerArea(indexUrl);

  testMatchmaking(indexUrl);

  testAuditorArea(indexUrl);

  testOnlineAccountApply(indexUrl);
}

function testIndex(indexUrl) {
  // Get Index
  const indexRes = http.get(`${indexUrl}`);
  check(indexRes, { "status was 200": (r) => r.status == 200 });
  indexResTrend.add(indexRes.timings.duration);
}

function testBlog(indexUrl) {
  // Get blog
  const traceCode = "1301002262";
  const LogID = "33543";
  const blogByLogIDRes = http.get(`${indexUrl}/blog/${traceCode}?logID=${LogID}`);
  check(blogByLogIDRes, { "status was 200": (r) => r.status == 200 });
  blogByLogIDResTrend.add(blogByLogIDRes.timings.duration);

  // Get blog
  const blogRes = http.get(`${indexUrl}/blog/${traceCode}`);
  check(blogRes, { "status was 200": (r) => r.status == 200 });
  blogResTrend.add(blogRes.timings.duration);
}

function testMap(indexUrl) {
  // Get Map
  const mapRes = http.get(`${indexUrl}/Page/Map`);
  check(mapRes, { "status was 200": (r) => r.status == 200 });
  mapResTrend.add(mapRes.timings.duration);
}

function testProducerSearch(indexUrl) {
  const traceCode = "1301002262";
  // Get ProducerSearch
  const producerSearchRes = http.get(`${indexUrl}/ProducerSearch`);
  check(producerSearchRes, { "status was 200": (r) => r.status == 200 });
  producerSearchResTrend.add(producerSearchRes.timings.duration);

  const antiForgeryToken = getAntiForgeryToken(producerSearchRes);
  // Post ProducerSearch
  const postProducerSearchRes = http.post(`${indexUrl}/ProducerSearch`, {
    __RequestVerificationToken: antiForgeryToken,
    ByTraceCode: traceCode,
  });
  check(postProducerSearchRes, { "status was 200": (r) => r.status == 200 });
  producerSearchDetailResTrend.add(postProducerSearchRes.timings.duration);
}

function testProducerSearchDetail(indexUrl) {
  const batchID = "8499";
  // Get ProducerSearchDetail
  const producerSearchDetailRes = http.get(`${indexUrl}/ProducerSearch/Detail/${batchID}`);
  check(producerSearchDetailRes, { "status was 200": (r) => r.status == 200 });
  producerSearchDetailResTrend.add(producerSearchDetailRes.timings.duration);
}

function testBatchIndex(indexUrl) {
  // Get BatchIndex
  const batchIndexRes = http.get(`${indexUrl}/ProducerSearch/BatchIndex`);
  check(batchIndexRes, { "status was 200": (r) => r.status == 200 });
  batchIndexResTrend.add(batchIndexRes.timings.duration);

  const antiForgeryToken = getAntiForgeryToken(batchIndexRes);
  const traceCode = "1301002262";
  // Post BatchIndex
  const postBatchIndexRes = http.post(`${indexUrl}/ProducerSearch/BatchIndex`, {
    __RequestVerificationToken: antiForgeryToken,
    ByBatchCode: traceCode,
  });
  check(postBatchIndexRes, { "status was 200": (r) => r.status == 200 });
  postBatchIndexResTrend.add(postBatchIndexRes.timings.duration);
}

function testPage(indexUrl) {
  // Get Page
  const pageRes = http.get(`${indexUrl}/Page`);
  check(pageRes, { "status was 200": (r) => r.status == 200 });
  pageResTrend.add(pageRes.timings.duration);

  // Get /Page/Links
  const linksRes = http.get(`${indexUrl}/Page/Links`);
  check(linksRes, { "status was 200": (r) => r.status == 200 });
  linksResTrend.add(linksRes.timings.duration);

  // Get /Page/Privacy
  const privacyRes = http.get(`${indexUrl}/Page/Privacy`);
  check(privacyRes, { "status was 200": (r) => r.status == 200 });
  privacyResTrend.add(privacyRes.timings.duration);

  // Get /Page/OpenDeclaration
  const openDeclarationRes = http.get(`${indexUrl}/Page/OpenDeclaration`);
  check(openDeclarationRes, { "status was 200": (r) => r.status == 200 });
  openDeclarationResTrend.add(openDeclarationRes.timings.duration);
}

function testFAQ(indexUrl) {
  const keyWordFAQ = "二維條碼";
  // Get FAQ
  const faqRes = http.get(`${indexUrl}/FAQ`);
  check(faqRes, { "status was 200": (r) => r.status == 200 });
  faqResTrend.add(faqRes.timings.duration);

  const antiForgeryToken = getAntiForgeryToken(faqRes);
  // Post FAQ
  const postFaqRes = http.post(`${indexUrl}/FAQ`, {
    __RequestVerificationToken: antiForgeryToken,
    KeyWordFAQ: keyWordFAQ,
  });
  check(postFaqRes, { "status was 200": (r) => r.status == 200 });
  postFaqResTrend.add(postFaqRes.timings.duration);
}

function testDisableData(indexUrl) {
  // Get DisableData
  const disableDataRes = http.get(`${indexUrl}/DisableData`);
  check(disableDataRes, { "status was 200": (r) => r.status == 200 });
  disableDataResTrend.add(disableDataRes.timings.duration);

  const traceCodeDisable = "1101000158";
  const antiForgeryToken = getAntiForgeryToken(disableDataRes);
  // Post DisableData
  const postDisableDataRes = http.post(`${indexUrl}/DisableData`, {
    __RequestVerificationToken: antiForgeryToken,
    ByTraceCode: traceCodeDisable,
  });
  check(postDisableDataRes, { "status was 200": (r) => r.status == 200 });
  postDisableDataResTrend.add(postDisableDataRes.timings.duration);
}

function testApply(indexUrl) {
  // Get Apply
  const applyRes = http.get(`${indexUrl}/Apply`);
  check(applyRes, { "status was 200": (r) => r.status == 200 });
  applyResTrend.add(applyRes.timings.duration);

  // Get /Apply/Query
  const applyQueryRes = http.get(`${indexUrl}/Apply/Query`);
  check(applyQueryRes, { "status was 200": (r) => r.status == 200 });
  applyQueryResTrend.add(applyQueryRes.timings.duration);

  // Get /Apply/Forget
  const forgetRes = http.get(`${indexUrl}/Apply/Forget`);
  check(forgetRes, { "status was 200": (r) => r.status == 200 });
  forgetResTrend.add(forgetRes.timings.duration);
}

function testReport(indexUrl) {
  // Get /Report
  const reportRes = http.get(`${indexUrl}/Report`);
  check(reportRes, { "status was 200": (r) => r.status == 200 });
  reportResTrend.add(reportRes.timings.duration);
}

function testNews(indexUrl) {
  // Get /News/PublicNews
  const publicNewsRes = http.get(`${indexUrl}/News/PublicNews`);
  check(publicNewsRes, { "status was 200": (r) => r.status == 200 });
  publicNewsResTrend.add(publicNewsRes.timings.duration);

  const newsID = "107";
  // Get /News/PublicNews/{NewsID}
  const publicNewsByIDRes = http.get(`${indexUrl}/News/PublicNews/${newsID}`);
  check(publicNewsByIDRes, { "status was 200": (r) => r.status == 200 });
  publicNewsByIDResTrend.add(publicNewsByIDRes.timings.duration);

  const keyWordNews = "Google";
  const antiForgeryToken = getAntiForgeryToken(publicNewsByIDRes);
  // Post PublicNews
  const postPublicNewsRes = http.post(`${indexUrl}/News/PublicNews`, {
    __RequestVerificationToken: antiForgeryToken,
    ByTitle: keyWordNews,
  });
  check(postPublicNewsRes, { "status was 200": (r) => r.status == 200 });
  postPublicNewsResTrend.add(postPublicNewsRes.timings.duration);
}

function testProducerArea(indexUrl) {
  // Get /ProducerArea
  const producerAreaRes = http.get(`${indexUrl}/ProducerArea`);
  check(producerAreaRes, { "status was 200": (r) => r.status == 200 });
  producerAreaResTrend.add(producerAreaRes.timings.duration);

  // Get /ProducerArea/NewsIndex
  const newsIndexRes = http.get(`${indexUrl}/ProducerArea/NewsIndex`);
  check(newsIndexRes, { "status was 200": (r) => r.status == 200 });
  newsIndexResTrend.add(newsIndexRes.timings.duration);

  // Get /ProducerArea/NewsIndex/79
  const newsIndexByIDRes = http.get(`${indexUrl}/ProducerArea/NewsIndex/79`);
  check(newsIndexByIDRes, { "status was 200": (r) => r.status == 200 });
  newsIndexByIDResTrend.add(newsIndexByIDRes.timings.duration);

  // Get /ProducerArea/AvailableCropIndex
  const availableCropIndexRes = http.get(`${indexUrl}/ProducerArea/AvailableCropIndex`);
  check(availableCropIndexRes, { "status was 200": (r) => r.status == 200 });
  availableCropIndexResTrend.add(availableCropIndexRes.timings.duration);

  const keyWordAvailableCrop = "山蘇";
  const antiForgeryToken = getAntiForgeryToken(availableCropIndexRes);
  // Post /ProducerArea/AvailableCropIndex
  const postAvailableCropIndexRes = http.post(`${indexUrl}/ProducerArea/AvailableCropIndex`, {
    __RequestVerificationToken: antiForgeryToken,
    ByKeyWord: keyWordAvailableCrop,
  });
  check(postAvailableCropIndexRes, { "status was 200": (r) => r.status == 200 });
  postAvailableCropIndexResTrend.add(postAvailableCropIndexRes.timings.duration);

  // Get /ProducerArea/FileDownload
  const fileDownloadRes = http.get(`${indexUrl}/ProducerArea/FileDownload`);
  check(fileDownloadRes, { "status was 200": (r) => r.status == 200 });
  fileDownloadResTrend.add(fileDownloadRes.timings.duration);
}

function testMatchmaking(indexUrl) {
  // Get /Matchmaking
  const matchmakingRes = http.get(`${indexUrl}/Matchmaking`);
  check(matchmakingRes, { "status was 200": (r) => r.status == 200 });
  matchmakingResTrend.add(matchmakingRes.timings.duration);

  const matchmakingID = "167";
  // Get /Matchmaking/View/{MatchmakingID}
  const matchmakingViewRes = http.get(`${indexUrl}/Matchmaking/View/${matchmakingID}`);
  check(matchmakingViewRes, { "status was 200": (r) => r.status == 200 });
  matchmakingViewResTrend.add(matchmakingViewRes.timings.duration);

  const keyWordMatchmaking = "火龍果";
  const antiForgeryToken = getAntiForgeryToken(matchmakingViewRes);
  // Post /Matchmaking
  const postMatchmakingRes = http.post(`${indexUrl}/Matchmaking`, {
    __RequestVerificationToken: antiForgeryToken,
    BySubject: keyWordMatchmaking,
  });
  check(postMatchmakingRes, { "status was 200": (r) => r.status == 200 });
  postMatchmakingResTrend.add(postMatchmakingRes.timings.duration);
}

function testAuditorArea(indexUrl) {
  // Get /AuditorArea
  const auditorAreaRes = http.get(`${indexUrl}/AuditorArea`);
  check(auditorAreaRes, { "status was 200": (r) => r.status == 200 });
  auditorAreaResTrend.add(auditorAreaRes.timings.duration);
}

function testOnlineAccountApply(indexUrl) {
  // Get /OnlineAccountApply
  const onlineAccountApplyRes = http.get(`${indexUrl}/OnlineAccountApply`);
  check(onlineAccountApplyRes, { "status was 200": (r) => r.status == 200 });
  onlineAccountApplyResTrend.add(onlineAccountApplyRes.timings.duration);
}

/**
 * 處理報告
 * @param {*} data
 * @returns
 */
// export function handleSummary(data) {
//   return {
//     "result.html": htmlReport(data), // 產生 HTML 報告
//     stdout: textSummary(data, { indent: " ", enableColors: true }), // 產生 Console 報告
//   };
// }