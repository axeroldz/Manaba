const delay = ms => new Promise(res => setTimeout(res, ms));
const addNewReport = (reports, report) => {
  const newReportElement = document.createElement("div");
  const reportNameElement = document.createElement("a");
  const reportDateElement = document.createElement("a");

  reportNameElement.textContent = report.course;
  reportNameElement.href = report.link;
  reportNameElement.className = "link";

  reportDateElement.textContent = report.date +"  "+ report.time;
  
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

const calculateDate =  () => {
  var date1 = new Date("06/30/2019");
var date2 = new Date("07/30/2019");
  
// To calculate the time difference of two dates
var Difference_In_Time = date2.getTime() - date1.getTime();
  
// To calculate the no. of days between two dates
var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  
//To display the final no. of days (result)
document.write("Total number of days between dates  <br>"
               + date1 + "<br> and <br>" 
               + date2 + " is: <br> " 
               + Difference_In_Days);
};
