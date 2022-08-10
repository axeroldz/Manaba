const delay = ms => new Promise(res => setTimeout(res, ms));
const addNewReport = (reports, report) => {
  const newReportElement = document.createElement("div");
  const reportNameElement = document.createElement("a");
  const reportDateElement = document.createElement("a");

  reportNameElement.textContent = report.course;
  reportNameElement.href = report.link;
  reportNameElement.className = "link";

  let hourDiff = calculateHours(report.date,report.time);
  reportDateElement.textContent =  (hourDiff>24)?(Math.floor(hourDiff/24)+" 日後") : (hourDiff+ " 時間後");
  reportDateElement.className =  (hourDiff<48)? "timeLeft danger" : "timeLeft safe";
  
  newReportElement.className = "report";

  newReportElement.appendChild(reportNameElement);
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
  // To calculate the time difference of two dates in ms
  const diffTime = reportDate.getTime() - currentDate.getTime();
    
  // To calculate the no. of days between two dates
  const diffHours = diffTime / (1000 * 3600);
 
  //To display the final no. of days (result)
  return Math.floor(diffHours);
};
