(async ()=>{
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(3000);
    const readKamoku = () =>
    {
        const table = document.getElementsByClassName("course");
        let kamoku = ""
        for(let i = 0;i<table.length;i++){
            let children = table[i].childNodes.length;
            switch(children){
                case 3:
                    kamoku = table[i].childNodes[1].innerText.split(" ")[0];
                    console.log(kamoku + " Q1 Q2 \n");
                    break;
                
                case 5:
                    kamoku = table[i].childNodes[1].innerText.split(" ")[0];
                    console.log(kamoku + " Q1\n");
                    kamoku = table[i].childNodes[3].innerText.split(" ")[0];
                    console.log(kamoku + " Q2\n");
                    break;
                
                case 7:
                    kamoku = table[i].childNodes[1].innerText.split(" ")[0];
                    console.log(kamoku + " Q1\n");
                    kamoku = table[i].childNodes[3].innerText.split(" ")[0];
                    console.log(kamoku + " Q2\n");
                    kamoku = table[i].childNodes[5].innerText.split(" ")[0];
                    console.log(kamoku + " Q3\n");
                    break;

                case 9:
                    kamoku = table[i].childNodes[1].innerText.split(" ")[0];
                    console.log(kamoku + " Q1\n");
                    kamoku = table[i].childNodes[3].innerText.split(" ")[0];
                    console.log(kamoku + " Q2\n");
                    kamoku = table[i].childNodes[5].innerText.split(" ")[0];
                    console.log(kamoku + " Q3\n");
                    kamoku = table[i].childNodes[7].innerText.split(" ")[0];
                    console.log(kamoku + " Q4\n");
                    break;
            }

        }
    }


    //readKamoku();
    let currentReports = [];
    const table = document.getElementsByClassName("groupthreadlist")[0];
    const addReport = async () => {
        if(table){
            const tableRow = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
            const reports = [];
            if(tableRow[0]){
                for(let i = 0;i<tableRow.length;i++){
                    const row = tableRow[i];
                    const reportLink = row.getElementsByTagName("th")[0].getElementsByTagName("a")[0].href;
                    if(reportLink.includes("report")){
                        const reportName = row.getElementsByTagName("td")[1].getElementsByTagName("div")[0].title.split(" ")[0]
                        let reportDate = row.getElementsByTagName("td")[0].title.split(" ")[0];
                        reportDate = reportDate.replaceAll('-','/');
                        const reportTime = row.getElementsByTagName("td")[0].title.split(" ")[1];
                        reports.push({
                            course: reportName,
                            date : reportDate,
                            time :reportTime,
                            link : reportLink
                            });
                        //console.log(reportName + " +  " +reportDate+" + "+reportTime) // '2022-07-15 23:55' string
                    }
                }
            chrome.storage.sync.set({ ["reportData"]: JSON.stringify([reports]) });
            }
        }
    }

    addReport();

})();