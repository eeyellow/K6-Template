import http from "k6/http";
import { check } from "k6";
import { parseHTML } from "k6/html";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.3/index.js";
import { Trend } from 'k6/metrics';

// 壓測情境設定
export const options = {
  stages: [
    { duration: "15s", target: 50 },
    { duration: "15s", target: 0 },
  ]
};

// const indexTrend = new Trend('indexTrend');
// const blogByLogIDTrend = new Trend('blogByLogIDTrend');
// const mapTrend = new Trend('mapTrend');
// const producerSearchTrend = new Trend('producerSearchTrend');
// const postProducerSearchTrend = new Trend('postProducerSearchTrend');
// const blogTrend = new Trend('blogTrend');
// const detailTrend = new Trend('detailTrend');
// const batchIndexTrend = new Trend('batchIndexTrend');
// const postBatchIndexTrend = new Trend('postBatchIndexTrend');
// const pageTrend = new Trend('pageTrend');
// const faqTrend = new Trend('faqTrend');
// const postFaqTrend = new Trend('postFaqTrend');
// const disableDataTrend = new Trend('disableDataTrend');
// const postDisableDataTrend = new Trend('postDisableDataTrend');
// const applyTrend = new Trend('applyTrend');
// const applyQueryTrend = new Trend('applyQueryTrend');
// const forgetTrend = new Trend('forgetTrend');
// const reportTrend = new Trend('reportTrend');
// const publicNewsTrend = new Trend('publicNewsTrend');
// const publicNewsByIDTrend = new Trend('publicNewsByIDTrend');
// const postPublicNewsTrend = new Trend('postPublicNewsTrend');
// const producerAreaTrend = new Trend('producerAreaTrend');
// const newsIndexTrend = new Trend('newsIndexTrend');
// const newsIndexByIDTrend = new Trend('newsIndexByIDTrend');
// const availableCropIndexTrend = new Trend('availableCropIndexTrend');
// const postAvailableCropIndexTrend = new Trend('postAvailableCropIndexTrend');
// const fileDownloadTrend = new Trend('fileDownloadTrend');
// const matchmakingTrend = new Trend('matchmakingTrend');
// const matchmakingViewTrend = new Trend('matchmakingViewTrend');
// const postMatchmakingTrend = new Trend('postMatchmakingTrend');
// const auditorAreaTrend = new Trend('auditorAreaTrend');
// const onlineAccountApplyTrend = new Trend('onlineAccountApplyTrend');
// const linksTrend = new Trend('linksTrend');
// const privacyTrend = new Trend('privacyTrend');
// const openDeclarationTrend = new Trend('openDeclarationTrend');

// 壓測主程式
export default function () {
  const IndexUrl = "https://qrtracegcb.lingcheng.tw";
  const TraceCode = "1301002262";
  const LogID = "33543";
  const BatchID = "8499";
  const KeyWordFAQ = "二維條碼";
  const TraceCodeDisable = "1101000158";
  const KeyWordNews = "Google";
  const NewsID = "107";
  const KeyWordAvailableCrop = "山蘇";
  const MatchmakingID = "167";
  const KeyWordMatchmaking = "火龍果";
  
  let antiForgeryToken = "";

  // Get Index
  const indexRes = http.get(`${IndexUrl}`);
  // 檢查 HTTP 狀態碼
  check(indexRes, { "status was 200": (r) => r.status == 200 });
  // indexTrend.add(indexRes.timings.duration, {
  //   my_tag: "I'm a tag"
  // });

  // Get blog
  const blogByLogIDRes = http.get(`${IndexUrl}/blog/${TraceCode}?logID=${LogID}`,{

  });
  check(blogByLogIDRes, { "status was 200": (r) => r.status == 200 });
  //blogByLogIDTrend.add(blogByLogIDRes.timings.duration);

  // Get Map
  const mapRes = http.get(`${IndexUrl}/Page/Map`);
  check(mapRes, { "status was 200": (r) => r.status == 200 });
  //mapTrend.add(mapRes.timings.duration);

  // Get ProducerSearch
  const producerSearchRes = http.get(`${IndexUrl}/ProducerSearch`);
  check(producerSearchRes, { "status was 200": (r) => r.status == 200 });
  //producerSearchTrend.add(producerSearchRes.timings.duration);

  antiForgeryToken = getAntiForgeryToken(producerSearchRes);
  // Post ProducerSearch
  const postProducerSearchRes = http.post(`${IndexUrl}/ProducerSearch`, {
    __RequestVerificationToken: antiForgeryToken,
    ByTraceCode: TraceCode,
  });
  check(postProducerSearchRes, { "status was 200": (r) => r.status == 200 });
  //postProducerSearchTrend.add(postProducerSearchRes.timings.duration);

  // Get blog
  const blogRes = http.get(`${IndexUrl}/blog/${TraceCode}`);
  check(blogRes, { "status was 200": (r) => r.status == 200 });
  //blogTrend.add(blogRes.timings.duration);

  // Get Detail
  const producerSearchDetailRes = http.get(`${IndexUrl}/ProducerSearch/Detail/${BatchID}`);
  check(producerSearchDetailRes, { "status was 200": (r) => r.status == 200 });
  //detailTrend.add(producerSearchDetailRes.timings.duration);

  // Get BatchIndex
  const batchIndexRes = http.get(`${IndexUrl}/ProducerSearch/BatchIndex`);
  check(batchIndexRes, { "status was 200": (r) => r.status == 200 });
  //batchIndexTrend.add(batchIndexRes.timings.duration);

  antiForgeryToken = getAntiForgeryToken(batchIndexRes);  
  // Post BatchIndex
  const postBatchIndexRes = http.post(`${IndexUrl}/ProducerSearch/BatchIndex`, {
    __RequestVerificationToken: antiForgeryToken,
    ByBatchCode: TraceCode,
  });
  check(postBatchIndexRes, { "status was 200": (r) => r.status == 200 });
  //postBatchIndexTrend.add(postBatchIndexRes.timings.duration);

  // Get Page
  const pageRes = http.get(`${IndexUrl}/Page`);
  check(pageRes, { "status was 200": (r) => r.status == 200 });
  //pageTrend.add(pageRes.timings.duration);

  // Get FAQ
  const faqRes = http.get(`${IndexUrl}/FAQ`);
  check(faqRes, { "status was 200": (r) => r.status == 200 });
  //faqTrend.add(faqRes.timings.duration);

  antiForgeryToken = getAntiForgeryToken(faqRes);
  // Post FAQ
  const postFaqRes = http.post(`${IndexUrl}/FAQ`, {
    __RequestVerificationToken: antiForgeryToken,
    KeyWordFAQ: KeyWordFAQ,
  });
  check(postFaqRes, { "status was 200": (r) => r.status == 200 });
  //postFaqTrend.add(postFaqRes.timings.duration);

  // Get DisableData
  const disableDataRes = http.get(`${IndexUrl}/DisableData`);
  check(disableDataRes, { "status was 200": (r) => r.status == 200 });
  //disableDataTrend.add(disableDataRes.timings.duration);

  antiForgeryToken = getAntiForgeryToken(disableDataRes);
  // Post DisableData
  const postDisableDataRes = http.post(`${IndexUrl}/DisableData`, {
    __RequestVerificationToken: antiForgeryToken,
    ByTraceCode: TraceCodeDisable,
  });
  check(postDisableDataRes, { "status was 200": (r) => r.status == 200 });
  //postDisableDataTrend.add(postDisableDataRes.timings.duration);

  // Get Apply
  const applyRes = http.get(`${IndexUrl}/Apply`);
  check(applyRes, { "status was 200": (r) => r.status == 200 });
  //applyTrend.add(applyRes.timings.duration);

  // Get /Apply/Query
  const applyQueryRes = http.get(`${IndexUrl}/Apply/Query`);
  check(applyQueryRes, { "status was 200": (r) => r.status == 200 });
  //applyQueryTrend.add(applyQueryRes.timings.duration);

  // Get /Apply/Forget
  const forgetRes = http.get(`${IndexUrl}/Apply/Forget`);
  check(forgetRes, { "status was 200": (r) => r.status == 200 });
  //forgetTrend.add(forgetRes.timings.duration);

  // Get /Report
  const reportRes = http.get(`${IndexUrl}/Report`);
  check(reportRes, { "status was 200": (r) => r.status == 200 });
  //reportTrend.add(reportRes.timings.duration);

  // Get /News/PublicNews
  const publicNewsRes = http.get(`${IndexUrl}/News/PublicNews`);
  check(publicNewsRes, { "status was 200": (r) => r.status == 200 });
  //publicNewsTrend.add(publicNewsRes.timings.duration);

  // Get /News/PublicNews/{NewsID}
  const publicNewsByIDRes = http.get(`${IndexUrl}/News/PublicNews/${NewsID}`);
  check(publicNewsByIDRes, { "status was 200": (r) => r.status == 200 });
  //publicNewsByIDTrend.add(publicNewsByIDRes.timings.duration);

  antiForgeryToken = getAntiForgeryToken(publicNewsByIDRes);
  // Post PublicNews
  const postPublicNewsRes = http.post(`${IndexUrl}/News/PublicNews`, {
    __RequestVerificationToken: antiForgeryToken,
    ByTitle: KeyWordNews,
  });
  check(postPublicNewsRes, { "status was 200": (r) => r.status == 200 });
  //postPublicNewsTrend.add(postPublicNewsRes.timings.duration);

  // Get /ProducerArea
  const producerAreaRes = http.get(`${IndexUrl}/ProducerArea`);
  check(producerAreaRes, { "status was 200": (r) => r.status == 200 });
  //producerAreaTrend.add(producerAreaRes.timings.duration);

  // Get /ProducerArea/NewsIndex
  const newsIndexRes = http.get(`${IndexUrl}/ProducerArea/NewsIndex`);
  check(newsIndexRes, { "status was 200": (r) => r.status == 200 });
  //newsIndexTrend.add(newsIndexRes.timings.duration);

  // Get /ProducerArea/NewsIndex/79
  const newsIndexByIDRes = http.get(`${IndexUrl}/ProducerArea/NewsIndex/79`);
  check(newsIndexByIDRes, { "status was 200": (r) => r.status == 200 });
  //newsIndexByIDTrend.add(newsIndexByIDRes.timings.duration);

  // Get /ProducerArea/AvailableCropIndex
  const availableCropIndexRes = http.get(`${IndexUrl}/ProducerArea/AvailableCropIndex`);
  check(availableCropIndexRes, { "status was 200": (r) => r.status == 200 });
  //availableCropIndexTrend.add(availableCropIndexRes.timings.duration);

  antiForgeryToken = getAntiForgeryToken(availableCropIndexRes);
  // Post /ProducerArea/AvailableCropIndex
  const postAvailableCropIndexRes = http.post(`${IndexUrl}/ProducerArea/AvailableCropIndex`, {
    __RequestVerificationToken: antiForgeryToken,
    ByKeyWord: KeyWordAvailableCrop,
  });
  check(postAvailableCropIndexRes, { "status was 200": (r) => r.status == 200 });
  //postAvailableCropIndexTrend.add(postAvailableCropIndexRes.timings.duration);

  // Get /ProducerArea/FileDownload
  const fileDownloadRes = http.get(`${IndexUrl}/ProducerArea/FileDownload`);
  check(fileDownloadRes, { "status was 200": (r) => r.status == 200 });
  //fileDownloadTrend.add(fileDownloadRes.timings.duration);

  // Get /Matchmaking
  const matchmakingRes = http.get(`${IndexUrl}/Matchmaking`);
  check(matchmakingRes, { "status was 200": (r) => r.status == 200 });
  //matchmakingTrend.add(matchmakingRes.timings.duration);

  // Get /Matchmaking/View/{MatchmakingID}
  const matchmakingViewRes = http.get(`${IndexUrl}/Matchmaking/View/${MatchmakingID}`);
  check(matchmakingViewRes, { "status was 200": (r) => r.status == 200 });
  //matchmakingViewTrend.add(matchmakingViewRes.timings.duration);

  antiForgeryToken = getAntiForgeryToken(matchmakingViewRes);
  // Post /Matchmaking
  const postMatchmakingRes = http.post(`${IndexUrl}/Matchmaking`, {
    __RequestVerificationToken: antiForgeryToken,
    BySubject: KeyWordMatchmaking,
  });
  check(postMatchmakingRes, { "status was 200": (r) => r.status == 200 });
  //postMatchmakingTrend.add(postMatchmakingRes.timings.duration);

  // Get /AuditorArea
  const auditorAreaRes = http.get(`${IndexUrl}/AuditorArea`);
  check(auditorAreaRes, { "status was 200": (r) => r.status == 200 });
  //auditorAreaTrend.add(auditorAreaRes.timings.duration);

  // Get /OnlineAccountApply
  const onlineAccountApplyRes = http.get(`${IndexUrl}/OnlineAccountApply`);
  check(onlineAccountApplyRes, { "status was 200": (r) => r.status == 200 });
  //onlineAccountApplyTrend.add(onlineAccountApplyRes.timings.duration);

  // Get /Page/Links
  const linksRes = http.get(`${IndexUrl}/Page/Links`);
  check(linksRes, { "status was 200": (r) => r.status == 200 });
  //linksTrend.add(linksRes.timings.duration);

  // Get /Page/Privacy
  const privacyRes = http.get(`${IndexUrl}/Page/Privacy`);
  check(privacyRes, { "status was 200": (r) => r.status == 200 });
  //privacyTrend.add(privacyRes.timings.duration);

  // Get /Page/OpenDeclaration
  const openDeclarationRes = http.get(`${IndexUrl}/Page/OpenDeclaration`);
  check(openDeclarationRes, { "status was 200": (r) => r.status == 200 });
  //openDeclarationTrend.add(openDeclarationRes.timings.duration);
}

/**
 * 取得 AntiForgeryToken
 * @param {*} response 
 * @returns 
 */
function getAntiForgeryToken(response) {
  // 解析 HTML
  let document = parseHTML(response.body);

  // 使用 CSS 選擇器選取 AntiForgeryToken 的元素
  let antiForgeryToken = document
    .find('input[name="__RequestVerificationToken"]')
    .attr("value");

  return antiForgeryToken;
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