Page({

  data: {
    imagePath: '/assets/images/3.png',
    face: null
  },

  chooseImage: function () {
    var _this = this;
    wx.chooseImage({
      success: function(res) {
        // console.log(res);
        _this.setData({
          imagePath: res.tempFiles[0].path
        })
        // 将获取到的照片信息发送到qq.com 分析信息
        wx.uploadFile({
          url: 'https://ai.qq.com/cgi-bin/appdemo_detectface',
          filePath: res.tempFiles[0].path,
          // 是qq.com规定的
          name: 'image_file',
          success: function (info) {
            var data = JSON.parse(info.data);
            // console.log(data);
            // 更新数据模型
            _this.setData({
              face: data.data.face[0]
            })
          }
        })
      },
    })
  }
})