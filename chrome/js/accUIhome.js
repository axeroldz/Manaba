const accMenu = document.querySelectorAll(".my-infolist");
let accNameList = ["課題", "お知らせ", "大学からの課題・アンケート", "コース一覧", "その他の曜日", "使わないコース  ※現在、担当教員もしくは管理者により「使わない」と設定されています。"];
let accSaveList= [0,0,0,0,0,0];
function accUI(elem) {
  let accContent;
  if(elem.nodeType == 1){
    accContent = elem.childNodes;
  }else{
    accContent = this.parentNode.childNodes;
  }
  let i = 2;
  if(accContent[1].nodeType == 3){
    i++;
  }
  let accName = accContent[i-1].innerText;//
  let accDisplayFlag = 0;
  for(; i<accContent.length;i++){
    if(accContent[i].nodeType == 1){
      if(accContent[i].style.display != "none"){
        accContent[i].style.display = "none";
        accDisplayFlag = 1;
      }
      else{
        accContent[i].style.display = "block";
        accDisplayFlag = 0;
      }
    }
  }
  let accSaveData = 9;
  if(accDisplayFlag == 1){
    accContent[0].innerHTML = "<p>▼</p>"
    accSaveData = 1;
  }
  else{
    accContent[0].innerHTML = "<p>▲</p>"
    accSaveData = 0;
  }
  let accpushtemp = "";
  for(let j = 0;j<accNameList.length;j++){
    if(accName == accNameList[j]){
      accpushtemp = j;
    }
  }
  accSaveList[accpushtemp] = accSaveData;
  chrome.storage.sync.set({"accSaveData" : accSaveList},function(){
    console.log("AccSaved:"+accSaveList);
  });
}
let acctoggle = [];
let acclength = 0;
if(accMenu.length >= 5){
  acclength = 5;
}
else{
  acclength = accMenu.length-1;
}

for(let i=0;i<acclength;i++){
  acctoggle[i] = document.createElement("div");
  acctoggle[i].innerHTML = "<p>▲</p>";
  acctoggle[i].setAttribute("class", "accmenu_toggle");
  acctoggle[i].style.position = "relative";
  acctoggle[i].style.top = "27px";
  acctoggle[i].style.left = "645px";
  acctoggle[i].style.fontSize = "1.7em";
  acctoggle[i].style.width = "1.8em";
  acctoggle[i].style.zIndex = "2";
  acctoggle[i].style.margin = "0.1px";
  acctoggle[i].style.color = "#2e7c40";
  accMenu[i].insertBefore(acctoggle[i],accMenu[i].childNodes[0]);
  accMenu[i].style.marginTop = "-2em";
}
//header click event
accMenu[0].childNodes[1].addEventListener("click",accUI);
accMenu[1].childNodes[2].addEventListener("click",accUI);
accMenu[2].childNodes[2].addEventListener("click",accUI);
accMenu[3].childNodes[2].addEventListener("click",accUI);
//triangle click event
accMenu[0].childNodes[0].addEventListener("click",accUI);
accMenu[1].childNodes[0].addEventListener("click",accUI);
accMenu[2].childNodes[0].addEventListener("click",accUI);
accMenu[3].childNodes[0].addEventListener("click",accUI);
//text select restriction
accMenu[0].childNodes[0].onselectstart = () => false;
accMenu[1].childNodes[0].onselectstart = () => false;
accMenu[2].childNodes[0].onselectstart = () => false;
accMenu[3].childNodes[0].onselectstart = () => false;
if(accMenu.length >= 5){
  //header click event
  accMenu[4].childNodes[2].addEventListener("click",accUI);
  //triangle click event
  accMenu[4].childNodes[0].addEventListener("click",accUI);
  //text select restriction
  accMenu[4].childNodes[0].onselectstart = () => false;
}
const getStorage = (key = null) => new Promise(resolve => {
  chrome.storage.sync.get(key, (data) => {resolve(data)});
});
let accGetData;
function init_acc(){
  console.log("init_acc");
  for(let j = 0;j<accGetData.length;j++){
    if(accGetData[j]){
      let accCount = 1;
      if(accMenu[j].childNodes[1].nodeType == 3){
        accCount++;
      }
      if(accMenu[j].childNodes[accCount].innerText == accNameList[j]){
        accUI(accMenu[j]);
      }
    }
  }
}
function isEmpty(obj){
  for(let i in obj){
    return false;
  }
  return true;
}
(async () => {
  accGetData = await getStorage(["accSaveData"]);
  console.log(accGetData);
  accGetData = accGetData.accSaveData;
  if(isEmpty(accGetData)){
    accGetData = [0,0,0,0,0,0];
  }
  init_acc(); 
})();