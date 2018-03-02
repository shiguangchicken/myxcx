// pages/weather/weather.js
var url ="https://free-api.heweather.com/s6/weather/forecast?parameters"//和风天气
var Moji_appCode ="19a41d5fbdc44674811f9c4a1ce6397d"
var QQMapWX = require('../../qqmap-wx-jssdk1.0/qqmap-wx-jssdk.js');
var qqmapsdk;
var city;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weatherInfo: []  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //http://lbs.qq.com/qqmap_wx_jssdk/method-reverseGeocoder.html
  onLoad: function (options) {
  

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: "GLLBZ-LH53K-G53J5-AVFEF-LQKVE-F2BHJ"
    })
    //获取城市名称
    wx.getLocation({
      success: function (res) {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res1) {
            var tempcity = res1.result.address_component.city;
            city = tempcity.substr(0, tempcity.length - 1)
            //获取天气情况
            wx.request({
              url: url,
              data: {
                key: '7fdc5f25d72946dfa52598e64458d0b9',
                location: city
              },
              success: function (res) {
                console.log(res.data)
                var wether_result = res.data.HeWeather6[0]
                var forcast = wether_result.daily_forecast
                for (var i = 0; i < 3; i++) {
                  that.setData({
                    weatherInfo: that.data.weatherInfo.concat({
                      location: wether_result.basic.location,
                      wendu: forcast[i].tmp_min + "℃~" + forcast[i].tmp_max + "℃",
                      wather_type: forcast[i].cond_txt_d,
                      wicon: "http://fangweb-test.stor.sinaapp.com/wether/" + forcast[i].cond_code_d + ".png",
                      date: forcast[i].date
                    })

                  })
                }//end for
              }
            })
          },
          fail: function (res1) {
            console.log(res1);
          },
          complete: function (res1) {
            console.log(res1);
          }
        })
      },
    })
  },


})