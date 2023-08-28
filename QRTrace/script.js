import http from "k6/http";
import { check } from "k6";
import { getAntiForgeryToken } from "./util.js";
import { parseHTML } from "k6/html";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.3/index.js";

// 壓測情境設定
export const options = {
  stages: [
    { duration: "15s", target: 50 },
    { duration: "15s", target: 0 },
  ]
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

function testIndex(indexUrl){
  // Get Index
  const indexRes = http.get(`${indexUrl}`);
  check(indexRes, { "status was 200": (r) => r.status == 200 });
}

function testBlog(indexUrl){
  // Get blog
  const traceCode = "1301002262";
  const LogID = "33543";
  const blogByLogIDRes = http.get(`${indexUrl}/blog/${traceCode}?logID=${LogID}`);
  check(blogByLogIDRes, { "status was 200": (r) => r.status == 200 });

  // Get blog
  const blogRes = http.get(`${indexUrl}/blog/${traceCode}`);
  check(blogRes, { "status was 200": (r) => r.status == 200 });
}

function testMap(indexUrl){
  // Get Map
  const mapRes = http.get(`${indexUrl}/Page/Map`);
  check(mapRes, { "status was 200": (r) => r.status == 200 });
}

function testProducerSearch(indexUrl){
  const traceCode = "1301002262";
  // Get ProducerSearch
  const producerSearchRes = http.get(`${indexUrl}/ProducerSearch`);
  check(producerSearchRes, { "status was 200": (r) => r.status == 200 });

  const antiForgeryToken = getAntiForgeryToken(producerSearchRes);
  // Post ProducerSearch
  const postProducerSearchRes = http.post(`${indexUrl}/ProducerSearch`, {
    __RequestVerificationToken: antiForgeryToken,
    ByTraceCode: traceCode,
  });
  check(postProducerSearchRes, { "status was 200": (r) => r.status == 200 });
}

function testProducerSearchDetail(indexUrl){
  const batchID = "8499";
  // Get ProducerSearchDetail
  const producerSearchDetailRes = http.get(`${indexUrl}/ProducerSearch/Detail/${batchID}`);
  check(producerSearchDetailRes, { "status was 200": (r) => r.status == 200 });
}

function testBatchIndex(indexUrl){
  // Get BatchIndex
  const batchIndexRes = http.get(`${indexUrl}/ProducerSearch/BatchIndex`);
  check(batchIndexRes, { "status was 200": (r) => r.status == 200 });

 const antiForgeryToken = getAntiForgeryToken(batchIndexRes);
 const traceCode = "1301002262";
  // Post BatchIndex
  const postBatchIndexRes = http.post(`${indexUrl}/ProducerSearch/BatchIndex`, {
    __RequestVerificationToken: antiForgeryToken,
    ByBatchCode: traceCode,
  });
  check(postBatchIndexRes, { "status was 200": (r) => r.status == 200 });
}

function testPage(indexUrl){
  // Get Page
  const pageRes = http.get(`${indexUrl}/Page`);
  check(pageRes, { "status was 200": (r) => r.status == 200 });

  // Get /Page/Links
  const linksRes = http.get(`${indexUrl}/Page/Links`);
  check(linksRes, { "status was 200": (r) => r.status == 200 });

  // Get /Page/Privacy
  const privacyRes = http.get(`${indexUrl}/Page/Privacy`);
  check(privacyRes, { "status was 200": (r) => r.status == 200 });

  // Get /Page/OpenDeclaration
  const openDeclarationRes = http.get(`${indexUrl}/Page/OpenDeclaration`);
  check(openDeclarationRes, { "status was 200": (r) => r.status == 200 });
}

function testFAQ(indexUrl){
  const keyWordFAQ = "二維條碼";
  // Get FAQ
  const faqRes = http.get(`${indexUrl}/FAQ`);
  check(faqRes, { "status was 200": (r) => r.status == 200 });

  const antiForgeryToken = getAntiForgeryToken(faqRes);
  // Post FAQ
  const postFaqRes = http.post(`${indexUrl}/FAQ`, {
    __RequestVerificationToken: antiForgeryToken,
    KeyWordFAQ: keyWordFAQ,
  });
  check(postFaqRes, { "status was 200": (r) => r.status == 200 });
}

function testDisableData(indexUrl){
  // Get DisableData
  const disableDataRes = http.get(`${indexUrl}/DisableData`);
  check(disableDataRes, { "status was 200": (r) => r.status == 200 });

  const traceCodeDisable = "1101000158";
  const antiForgeryToken = getAntiForgeryToken(disableDataRes);
  // Post DisableData
  const postDisableDataRes = http.post(`${indexUrl}/DisableData`, {
    __RequestVerificationToken: antiForgeryToken,
    ByTraceCode: traceCodeDisable,
  });
  check(postDisableDataRes, { "status was 200": (r) => r.status == 200 });
}

function testApply(indexUrl){
  // Get Apply
  const applyRes = http.get(`${indexUrl}/Apply`);
  check(applyRes, { "status was 200": (r) => r.status == 200 });

  // Get /Apply/Query
  const applyQueryRes = http.get(`${indexUrl}/Apply/Query`);
  check(applyQueryRes, { "status was 200": (r) => r.status == 200 });

  // Get /Apply/Forget
  const forgetRes = http.get(`${indexUrl}/Apply/Forget`);
  check(forgetRes, { "status was 200": (r) => r.status == 200 });
}

function testReport(indexUrl){
  // Get /Report
  const reportRes = http.get(`${indexUrl}/Report`);
  check(reportRes, { "status was 200": (r) => r.status == 200 });  
}

function testNews(indexUrl){
    // Get /News/PublicNews
    const publicNewsRes = http.get(`${indexUrl}/News/PublicNews`);
    check(publicNewsRes, { "status was 200": (r) => r.status == 200 });
  
    const newsID = "107";
    // Get /News/PublicNews/{NewsID}
    const publicNewsByIDRes = http.get(`${indexUrl}/News/PublicNews/${newsID}`);
    check(publicNewsByIDRes, { "status was 200": (r) => r.status == 200 });
    
    const keyWordNews = "Google";
    const antiForgeryToken = getAntiForgeryToken(publicNewsByIDRes);
    // Post PublicNews
    const postPublicNewsRes = http.post(`${indexUrl}/News/PublicNews`, {
      __RequestVerificationToken: antiForgeryToken,
      ByTitle: keyWordNews,
    });
    check(postPublicNewsRes, { "status was 200": (r) => r.status == 200 });
}

function testProducerArea(indexUrl){
    // Get /ProducerArea
    const producerAreaRes = http.get(`${indexUrl}/ProducerArea`);
    check(producerAreaRes, { "status was 200": (r) => r.status == 200 });
  
    // Get /ProducerArea/NewsIndex
    const newsIndexRes = http.get(`${indexUrl}/ProducerArea/NewsIndex`);
    check(newsIndexRes, { "status was 200": (r) => r.status == 200 });
  
    // Get /ProducerArea/NewsIndex/79
    const newsIndexByIDRes = http.get(`${indexUrl}/ProducerArea/NewsIndex/79`);
    check(newsIndexByIDRes, { "status was 200": (r) => r.status == 200 });
  
    // Get /ProducerArea/AvailableCropIndex
    const availableCropIndexRes = http.get(`${indexUrl}/ProducerArea/AvailableCropIndex`);
    check(availableCropIndexRes, { "status was 200": (r) => r.status == 200 });
  
    const keyWordAvailableCrop = "山蘇";
    const antiForgeryToken = getAntiForgeryToken(availableCropIndexRes);
    // Post /ProducerArea/AvailableCropIndex
    const postAvailableCropIndexRes = http.post(`${indexUrl}/ProducerArea/AvailableCropIndex`, {
      __RequestVerificationToken: antiForgeryToken,
      ByKeyWord: keyWordAvailableCrop,
    });
    check(postAvailableCropIndexRes, { "status was 200": (r) => r.status == 200 });
  
    // Get /ProducerArea/FileDownload
    const fileDownloadRes = http.get(`${indexUrl}/ProducerArea/FileDownload`);
    check(fileDownloadRes, { "status was 200": (r) => r.status == 200 });
}

function testMatchmaking(indexUrl){
  // Get /Matchmaking
  const matchmakingRes = http.get(`${indexUrl}/Matchmaking`);
  check(matchmakingRes, { "status was 200": (r) => r.status == 200 });

  const matchmakingID = "167";
  // Get /Matchmaking/View/{MatchmakingID}
  const matchmakingViewRes = http.get(`${indexUrl}/Matchmaking/View/${matchmakingID}`);
  check(matchmakingViewRes, { "status was 200": (r) => r.status == 200 });
  
  const keyWordMatchmaking = "火龍果";
  const antiForgeryToken = getAntiForgeryToken(matchmakingViewRes);
  // Post /Matchmaking
  const postMatchmakingRes = http.post(`${indexUrl}/Matchmaking`, {
    __RequestVerificationToken: antiForgeryToken,
    BySubject: keyWordMatchmaking,
  });
  check(postMatchmakingRes, { "status was 200": (r) => r.status == 200 });
}

function testAuditorArea(indexUrl){
  // Get /AuditorArea
  const auditorAreaRes = http.get(`${indexUrl}/AuditorArea`);
  check(auditorAreaRes, { "status was 200": (r) => r.status == 200 });
}

function testOnlineAccountApply(indexUrl){
    // Get /OnlineAccountApply
    const onlineAccountApplyRes = http.get(`${indexUrl}/OnlineAccountApply`);
    check(onlineAccountApplyRes, { "status was 200": (r) => r.status == 200 });
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