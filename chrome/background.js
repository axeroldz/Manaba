chrome.storage.sync.get(["reportData"], (data) => {
    const currentReportObj = data["reportData"] ? JSON.parse(data["reportData"]) : [];
    const currentReports = currentReportObj[0];
    chrome.action.setBadgeText({text: currentReports.length.toString()});
  });
  
  