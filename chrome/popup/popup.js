const delay = ms => new Promise(res => setTimeout(res, ms));
const addNewReport = (reports, report) => {
  const newReportElement = document.createElement("div");
  const reportNameElement = document.createElement("a");
  const reportDateElement = document.createElement("a");

  reportNameElement.textContent = report.course;
  reportNameElement.href = report.link;
  reportNameElement.className = "link";

  //reportDateElement.textContent = report.date +"  "+ report.time;
  const dateDiff = calculateDate(report.date,report.time);
  reportDateElement.textContent =  dateDiff[0]?(dateDiff[0]+"日後") : (dateDiff[1]+ "時間後");
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
    //console.log(currentReports); give array of reports
    viewReport(currentReports);
    
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

const calculateDate =  (date,time) => {
  let dateNTime = [];
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
  const Difference_In_Time = reportDate.getTime() - currentDate.getTime();
    
  // To calculate the no. of days between two dates
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  dateNTime.push(Math.floor(Difference_In_Days),Math.floor(Difference_In_Days*24));
  //To display the final no. of days (result)
  return dateNTime;
};
