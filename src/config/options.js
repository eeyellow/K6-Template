/**
 * 壓測情境設定
 */
export const options = {
    discardResponseBodies: true,
    insecureSkipTLSVerify: true,
    scenarios: {
      contacts: {
        executor: 'ramping-vus',
        startVUs: 1,
        gracefulRampDown: "30s",
        stages: [
            { duration: '3m', target: 10 },            
            { duration: '3m', target: 50 },
            { duration: '3m', target: 90 },
            { duration: '3m', target: 140 },
            { duration: '3m', target: 201 }
        ],
      },
    },
    // scenarios: {
    //     contacts: {
    //         executor: 'ramping-vus',
    //         startVUs: 10,
    //         stages: [
    //             { duration: '30s', target: 50 },
    //         ],
    //     },
    // },
};