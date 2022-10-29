const delay = ms => new Promise(res => setTimeout(res, ms));

const addNewReport = (reports, report) => {
  const newReportElement = document.createElement("div");
  const reportLinkElement = document.createElement("a");
  const reportDateElement = document.createElement("a");

  reportLinkElement.textContent = report.course;
  reportLinkElement.href = report.link;
  reportLinkElement.className = "link";

  if(report.date != -1){
      let hourDiff = calculateHours(report.date,report.time);

      if(hourDiff > 0){
        reportDateElement.className = "timeLeft";
        reportDateElement.title = report.date + " " + report.time;
        if(hourDiff > 24){ 
          hourDiff = (Math.floor(hourDiff/24)); 
          reportDateElement.textContent =  hourDiff+" 日後";
          if(hourDiff <= 2)
            newReportElement.className =  "report danger";
          else if(hourDiff <= 6)
            newReportElement.className =  "report safe";
          else 
            newReportElement.className =  "report";
        }  
        else{
          reportDateElement.textContent = hourDiff+ " 時間後";
          newReportElement.className =  "report danger";
        }
      }
    }
    else {
      newReportElement.className =  "report";
      reportDateElement.textContent = "";
  }
  newReportElement.appendChild(reportLinkElement);
  newReportElement.appendChild(reportDateElement);
  reports.appendChild(newReportElement);
};

const viewReport = (currentReports=[]) => {
  const reportsElement = document.getElementById("reports"); 
  reportsElement.innerHTML = "";

  if (currentReports.length > 0) {
    for (let i = 0; i < currentReports.length; i++) {
      const report = currentReports[i];
      addNewReport(reportsElement, report);
    }
  } else {
    reportsElement.innerHTML = '<i class="row">No Reports</i>';
  }

  return;
};

document.addEventListener("DOMContentLoaded", async () => {
  chrome.storage.sync.get(["reportData"], (data) => {

    const currentReportObj = data["reportData"] ? JSON.parse(data["reportData"]) : [];
    const currentReports = currentReportObj[0];

    viewReport(currentReports);
    clickHandler();
  });
});

const clickHandler =async () =>{
  await delay(100);
  const l = document.getElementsByClassName('link');
  for (let i of l) {
    i.onclick = () => {
      chrome.tabs.create({active: true, url: i.href});
    };
  };
}

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