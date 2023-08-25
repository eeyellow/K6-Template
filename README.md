# 使用 K6 做壓力測試

## K6 介紹

[官網](https://k6.io/)

[官方文件](https://k6.io/docs/)

[快速上手 Grafana k6 壓力測試工具 by Will 保哥](https://blog.miniasp.com/post/2023/08/01/Getting-Started-with-Grafana-k6-Load-testing-tool)

## 從 Visual Studio Web 效能和負載測試專案 移轉 至 K6

因 [Visual Studio Web 效能和負載測試功能已淘汰](https://learn.microsoft.com/zh-tw/visualstudio/test/quickstart-create-a-load-test-project?view=vs-2022)，需使用其他方式進行壓力測試，可參考設定檔來撰寫 script

`*.webtest`: 包含 request 資訊

`*.loadtest`: 包含 壓測的設定(時間、人數等)

## 使用 K6 做壓力測試

- 選項一: 使用 K6 dashboard

    [K6 dashboard](https://github.com/grafana/xk6-dashboard)

    1. 寫好 script.js
    2. 執行並查看結果

    - 使用 docker
    
    執行產生json
    
    ```powershell
    docker run -v ${PWD}:/scripts -p 5665:5665 -it ghcr.io/grafana/xk6-dashboard:latest run --out "json=/scripts/test_result_$(Get-Date -Format 'yyyyMMddHHmmss').json" /scripts/script.js
    ```
    
    透過 json 察看結果，執行指令後打開網址 http://127.0.0.1:5665
    
    ```powershell
    docker run -v ${PWD}:/scripts -p 5665:5665 -it ghcr.io/grafana/xk6-dashboard:latest dashboard replay /scripts/test_result_日期.json
    ```

    執行並匯出 html

    ```powershell
    docker run -v ${PWD}:/scripts -p 5665:5665 -it ghcr.io/grafana/xk6-dashboard:latest run --out 'dashboard=report=/scripts/test-report.html' /scripts/script.js
    ```

    - 一般安裝
    
    從 [這裡](https://github.com/grafana/xk6-dashboard/releases/) 下載後解壓縮放到與 script 相同路徑
    
    執行產生json

    ```powershell
    ./k6 run --out json=test_result_$(Get-Date -Format 'yyyyMMddHHmmss').json script.js
    ```

    透過 json 察看結果，執行指令後打開網址 http://127.0.0.1:5665

    ```powershell
    ./k6 dashboard replay test_result_日期.json
    ```

    執行並匯出 html

    ```powershell
    ./k6 run --out dashboard=report=test-report.html script.js
    ```

- 選項二: 使用原版 K6 搭配 K6 HTML Report

    Windows
    
    使用 [winget](https://learn.microsoft.com/zh-tw/windows/package-manager/winget/) 安裝
    
    ```powershell
    winget install k6
    ```
    
    其他安裝方式
    
    [官方安裝說明](https://k6.io/docs/get-started/installation/)
    
    [K6 HTML Report](https://github.com/benc-uk/k6-reporter) 使用方式
    
    1. 寫好 script.js
    
    2. 執行並查看結果
    
    ```powershell
    k6 run script.js
    ```
