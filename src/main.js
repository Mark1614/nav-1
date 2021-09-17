const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  {
    logo: "A",
    url: "https://www.acfun.cn",
  },
  {
    logo: "B",
    url: "https://www.bilibili.com",
  },
];
const simplifyUrl = (url) => {
  return (
    url
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      //删掉/开头的内容
      .replace(/\/.*/, "")
  );
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>      
            <div class="site">      
               <div class="logo">${node.logo[0]}</div>
               <div class="link">${simplifyUrl(node.url)}</div>
               <div class="close">
                    <svg class="icon">
                       <use xlink:href="#icon-close"></use>
                    </svg>
               </div>
            </div> 
       </li>`).insertBefore($lastLi);
    //用js代替a标签
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });
  render();
});
//保证添加的网址不丢失
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  window.localStorage.setItem("x", string);
};
$(document).on("keypress", (e) => {
  const key = e.key;
  for(let i=0;i<hashMap.length;i++){
      if(hashMap[i].logo.toLowerCase()===key){
          window.open(hashMap[i].url)
      }
  }
});
