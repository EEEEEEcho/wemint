function onLoad(options){
    var birthdayEndDate = util.getDate()
    var that = this
    wx.getStorage({
      key: 'person_info',
      success: function(res){
        var data = res.data
        that.setData({
          name: data.name,
          nickName: data.nickName,
          gender: data.gender,
          age: data.age,
          birthday: data.birthday,
          constellation: data.constellation,
          company: data.company,
          school: data.school,
          tel: data.tel,
          email: data.email,
          intro: data.intro,
          birthdayEndDate: birthdayEndDate
        })
      }
    })

}
function savePersonInfo(e) {
    var data = e.detail.value
    console.log(data);
    wx.setStorage({
      key: 'person_info',
      data: {
        name: data.name,
        nickName: data.nickName,
        gender: data.gender,
        age: data.age,
        birthday: data.birthday,
        constellation: data.constellation,
        company: data.company,
        school: data.school,
        tel: data.tel,
        email:data.email,
        intro: data.intro
      },
      success: function(res){
        wx.showToast({
          title: '资料修改成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function(){
          wx.navigateTo({
            url: '../personInfo/personInfo'
          })
        },2000)
      }
    })

}
function changeGender(e) {
    console.log(e)
    var genderIndex = e.detail.value
    if (genderIndex != "null") {
      this.setData({
        genderIndex: genderIndex,
        gender: this.data.genderArray[this.data.genderIndex]
      })
    }

}
function changeBirthday(e) {
    var birthday = e.detail.value
    if (birthday != "null") {
      this.setData(
        {birthday: birthday}
      )
    }

}
function changeConstellation(e) {
    var constellationIndex = e.detail.value
    if (constellationIndex != "null") {
      this.setData({
        constellationIndex: constellationIndex,
        constellation: this.data.constellationArray[this.data.constellationIndex]
      })
    }

}
