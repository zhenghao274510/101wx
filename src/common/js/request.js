// import wx from 'wx';//引用微信小程序wx对象
const http = {
  getRequest(data={},method="get") {
    wx.showLoading({
      title: '加载中',//数据请求前loading，提高用户体验
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: encodeURI("http://39.108.249.42/api/customer/services?json="+JSON.stringify(data)),
        method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
        //   'X-Bmob-Application-Id': bmobConfig.applicationId,
        //   'X-Bmob-REST-API-Key': bmobConfig.restApiKey,
          'Content-Type': 'application/json'
        }, // 设置请求的 header
        success: function (res) {
          // success
          
          if(res.statusCode!=200){
            wx.showToast({
              title: "网络出错，稍后再试",
              icon: "none"
            });
            return false;
          }
          resolve(res.data);
            wx.hideLoading();
        },
        fail: function (error) {
          // fail
          wx.hideLoading();
          reject(error);//请求失败
        },
        complete: function () {
          wx.hideLoading();
          // complete
        }
      })
    })
  },
  postRequest(data={},method="post") {
    wx.showLoading({
      title: '加载中',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url:  encodeURI("http://39.108.249.42/api/customer/services?json="+JSON.stringify(data)),
        method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
        //   'X-Bmob-Application-Id': bmobConfig.applicationId,
        //   'X-Bmob-REST-API-Key': bmobConfig.restApiKey,
          'Content-Type': 'application/json'
        }, // 设置请求的 header
        success: function (res) {
          // success
          wx.hideLoading();
          resolve(res.data);
        },
        fail: function (error) {
          // fail
          wx.hideLoading();
          reject(error);
        },
        complete: function () {
          // complete
          wx.hideLoading();
        }
      })
    })
  }
}

export default http;