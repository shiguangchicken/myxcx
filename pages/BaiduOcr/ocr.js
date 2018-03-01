
var tempfilepath='';
var url1 ="https://fangweb.applinzi.com/BaiduOcr/demo/DemoAipOcr.php";
var url2 ="https://fangweb.applinzi.com/sae_server1.php"
var topvalue=0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imsrc:'',
    info:"",
    location:"",
    topvalue:0,
    },

  /**
   * 生命周期函数--监听页面加载
   */
  uploadIm:function(){
    var that=this;
    wx.chooseImage({
      success: function(res) {
       tempfilepath=res.tempFilePaths;
       that.setData({
         imsrc:tempfilepath[0]
       })
       
       wx.uploadFile({
         url: url1,
         filePath: tempfilepath[0],
         name: 'flieup',
         success: function (res) {
           var jsObj = JSON.parse(res.data)
           //console.log(jsObj.words_result);
           that.setData({ info: that.rebuidInfo(jsObj.words_result)})

         },
         fail:function(res){
           console.log(res)
         }
       })
      },
    })
  },
  rebuidInfo: function (jsObj){
   for(var i=1;i<jsObj.length;i++){
     topvalue = jsObj[i-1].location.top;
     if(Math.abs(jsObj[i].location.top-topvalue)<10){ 
       //console.log(jsObj[i - 1].words) 
       //console.log(jsObj[i].words)
       jsObj[i - 1].words=jsObj[i-1].words.concat(jsObj[i].words);
        jsObj.splice(i,1)
     }
     else { /*console.log(">10执行次数：" + i); console.log(topvalue)8*/}
   }
   //console.log(jsObj);
   return jsObj;
  }
})