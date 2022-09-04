let accMenuc = document.querySelectorAll(".my-infolist");
let accNameList = ["課題",  "コース一覧", "その他の曜日", "使わないコース  ※現在、担当教員もしくは管理者により「使わない」と設定されています。"];
let accSaveListc= [0,0,0,0,0,0];
function accUIc(elem) {
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
  accSaveListc[accpushtemp] = accSaveData;
  chrome.storage.sync.set({"accSaveDatac" : accSaveListc},function(){
    console.log("AccSaved:"+accSaveListc);
  });
}
let acctogglec = [];
let acclengthc = 0;
if(accMenuc.length >= 5){
  acclengthc = 5;
}
else{
  acclengthc = accMenuc.length-1;
}

for(let i=0;i<acclengthc;i++){
  acctogglec[i] = document.createElement("div");
  acctogglec[i].innerHTML = "<p>▲</p>";
  acctogglec[i].setAttribute("class", "accMenuc_toggle");
  acctogglec[i].style.position = "relative";
  acctogglec[i].style.top = "27px";
  acctogglec[i].style.left = "645px";
  acctogglec[i].style.fontSize = "1.7em";
  acctogglec[i].style.width = "1.8em";
  acctogglec[i].style.zIndex = "2";
  acctogglec[i].style.margin = "0.1px";
  acctogglec[i].style.color = "#2e7c40";
  accMenuc[i].insertBefore(acctogglec[i],accMenuc[i].childNodes[0]);
  accMenuc[i].style.marginTop = "-2em";
}
//header click event
accMenuc[0].childNodes[1].addEventListener("click",accUIc);
accMenuc[1].childNodes[2].addEventListener("click",accUIc);
accMenuc[2].childNodes[2].addEventListener("click",accUIc);
accMenuc[3].childNodes[2].addEventListener("click",accUIc);
//triangle click event
accMenuc[0].childNodes[0].addEventListener("click",accUIc);
accMenuc[1].childNodes[0].addEventListener("click",accUIc);
accMenuc[2].childNodes[0].addEventListener("click",accUIc);
accMenuc[3].childNodes[0].addEventListener("click",accUIc);
//text select restriction
accMenuc[0].childNodes[0].onselectstart = () => false;
accMenuc[1].childNodes[0].onselectstart = () => false;
accMenuc[2].childNodes[0].onselectstart = () => false;
accMenuc[3].childNodes[0].onselectstart = () => false;
if(accMenuc.length >= 5){
  //header click event
  accMenuc[4].childNodes[2].addEventListener("click",accUIc);
  //triangle click event
  accMenuc[4].childNodes[0].addEventListener("click",accUIc);
  //text select restriction
  accMenuc[4].childNodes[0].onselectstart = () => false;
}
const getStoragec = (key = null) => new Promise(resolve => {
  chrome.storage.sync.get(key, (data) => {resolve(data)});
});
let accGetDatac;
function init_accc(){
  console.log("init_accc");
  for(let j = 0;j<accGetDatac.length;j++){
    if(accGetDatac[j]){
      let accCount = 1;
      if(accMenuc[j].childNodes[1].nodeType == 3){
        accCount++;
      }
      if(accMenuc[j].childNodes[accCount].innerText == accNameList[j]){
        accUIc(accMenuc[j]);
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
  accGetDatac = await getStoragec(["accSaveDatac"]);
  console.log(accGetDatac);
  accGetDatac = accGetDatac.accSaveDatac;
  if(isEmpty(accGetDatac)){
    accGetDatac = [0,0,0,0,0,0];
  }
  init_accc(); 
})();