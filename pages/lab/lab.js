// pages/index/index.js
Page({
  data: {
    notice: ""
  },
  login: function (e) {
    var that = this
    var c_number = e.detail.value.c_number
    var password = e.detail.value.pw
    wx.request({
      url: 'http://localhost/MyWeb/test.php',
      data: {
        c_number: c_number,
        password: password
      },
      success: function (res) {
        console.log(res.data)
        if (res.data == "ok") {
          wx.navigateTo({
            url: 'labfile',
          })
        }
        else that.setData({ notice: "账号或密码错误，请核对后再登录" })
      },
      fail: function (res) {
        console.log(res)
      }
    })
    //console.log('form发生了submit事件，携带数据为：', e.detail.value.c_number)
  }
})