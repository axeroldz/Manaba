(async ()=>{
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    const courses = [];
    const fetchQuarter = async () =>{
        const link = 'https://manaba.ryukoku.ac.jp/s/home_course?chglistformat=thumbnail';
        const result = await fetch(link);
        const htmlText = await result.text();
        const domparser = new DOMParser();
        const doc = domparser.parseFromString(htmlText, 'text/html');
        Array.from(doc.querySelectorAll('.course-list > li > a > table > tbody > tr > td')).map((a) => {
            let _a, _b;
            courses[(_a = a.querySelector('h3')) === null || _a === void 0 ? void 0 : _a.innerText.replace(/\s+/g, ' ').split(" ")[1]]=(_b = a
                    .querySelector('.info1')) === null || _b === void 0 ? void 0 : _b.innerText.replace(/\s+/g, ' ').split(" ")[1]
            });
    };
    const insertClass = (courseName,quarter) =>{
        //親ノード(courseName)のクラス名にquarterを追加する
        if(quarter === '前期')
            quarter = "1Q 2Q";
        if(quarter === '後期')
            quarter = "3Q 4Q";
        const cell = courseName.parentNode;
        const newName = cell.className +" "+ quarter;
        cell.className = newName;
    };
    fetchQuarter();
    await delay(800);
    const readNInsertKamoku = () =>
    {
        const table = Array.from(document.querySelectorAll('.course > .courselistweekly-c >a:not(.courseweekly-fav)'));
        for(let i = 0;i<table.length;i++){
            let code = table[i].innerText.split(" ")[1];
            if(Object.hasOwn(courses, code))
                insertClass(table[i],courses[code])
        }
    };
    readNInsertKamoku();
    
    const search = (quarter) =>{
        const cells =  Array.from(document.querySelectorAll('.course > .courselistweekly-c'));
        cells.forEach( cell =>{
            // cell は1科目の枠を示す。cell変数を使うといい。
            if(cell.className.includes(quarter))
                console.log(cell.querySelector('a').innerText);
        })
    }
    search('2Q'); //検索できるのが 1Q,2Q,3Q,4Q


    const addReport = async () => {
        chrome.storage.sync.clear();
        const tableRow = Array.from(document.querySelectorAll(".groupthreadlist > table > tbody > tr"));
            const reports = [];
            if(tableRow[0]){
                for(let i = 0;i<tableRow.length;i++){
                    const row = tableRow[i];
                    const reportName = row.querySelector('td > .news-courseinfo' ).title.split(" ")[0];
                    const reportLink = row.querySelector("th >div > a").href;
                    let reportDate = row.querySelector("td").title.split(" ")[0];
                    reportDate = reportDate.replaceAll('-','/');
                    const reportTime = row.querySelector("td").title.split(" ")[1];
                    reports.push({
                        course: reportName,
                        date : reportDate,
                        time :reportTime,
                        link : reportLink
                        });
                    
                }
            chrome.storage.sync.set({ ["reportData"]: JSON.stringify([reports]) });
            }
        
    }
     addReport();
})();