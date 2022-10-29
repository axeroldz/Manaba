chrome.tabs.onUpdated.addListener(() => {
  chrome.storage.sync.get(["reportData"], (data) => {
    const currentReportObj = data["reportData"] ? JSON.parse(data["reportData"]) : [];
    const currentReports = currentReportObj[0];
    const valReport = checkReport(currentReports) + "";

    chrome.action.setBadgeText({text: valReport});
    
  });
});

const calculateHours =  (date,time) => {
  const currentDate = new Date();
  const reportDateStr = date.split("/");
  const y = Number(reportDateStr[0]);
  const m = Number(reportDateStr[1] -1);
  const d = Number(reportDateStr[2]);
  const reportTimeStr = time.split(":");
  const h = Number(reportTimeStr[0]);
  const min = Number(reportTimeStr[1]);
  const reportDate = new Date(y,m,d,h,min);

  const diffTime = reportDate.getTime() - currentDate.getTime();
    
  const diffHours = diffTime / (1000 * 3600);

  return Math.floor(diffHours);
};

const checkReport = (currentReports=[]) => {
  let validReport = 0;
  if (currentReports.length > 0) {
    for (let i = 0; i < currentReports.length; i++) {
      const report = currentReports[i];
      if(report.date == -1)
        validReport++;
      else{
        const hourDiff = calculateHours(report.date,report.time);
        if(hourDiff > 0)
          validReport++;
      }
    }
      
  }
  return validReport;
};

