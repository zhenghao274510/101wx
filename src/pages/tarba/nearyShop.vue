<template>
  <div class="contain" ref="list">
    <van-popup v-model="donghua">
      <div class="lunhui">
        <van-loading type="spinner" color="#808080" />
        <p style="color:#808080">数据加载中...</p>
      </div>
    </van-popup>
    <div class="head">附近商家</div>
    <div v-if="pointyin==true" class="shopkong" @click="init">请点我重新定位</div>
    <div class="shop" v-else>
      <shop :dataList="dataList" @goDetail="goDetailID" v-if="nearyin==false"></shop>
      <div v-else class="kong">附近暂无商店</div>
    </div>
  </div>
</template>

<script>
import shop from "@/components/shop";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      donghua: false,
      num: 2,
      active: 2,
      dataList: [],
      page: 1,
      gou: 0,
      nearyin: false,
      pointyin: false,
      center:{P: 34.79185, Q: 113.67606999999998, lng: 113.67607, lat: 34.79185}
    };
  },
  components: {
    shop
  },
  created() {
   
  },
  mounted() {


     wx.getStorage({
        key: 'point',
        success: function(res){
          // success
          this.center=JSON.parse(res.data);
          console.log(this.center)
        },
      })
    this.nearbyShop();
    //  if (JSON.parse(localStorage.getItem("first"))) {
    //   localStorage.removeItem("first");
    // }
    wx.getStorage({
      key: 'user',
      success: function(res){
        console.log(res+'get')
        this.cid = JSON.parse(res.data).cid;
      },
    
    })
    // if (JSON.parse(localStorage.getItem("user")) !== null) {
    //   this.cid = JSON.parse(localStorage.getItem("user")).cid;
    // }
    // if (JSON.parse(localStorage.getItem("gouserInfo"))) {
    //   this.gou = JSON.parse(localStorage.getItem("gouNUm"));
    // }
  },
  methods: {
    nearbyShop() {
     
        this.donghua = true;
        this.pointyin = false;
        let nearbyShop = {
          cmd: "nearbyShop",
          cid: this.cid,
          lon: this.center.lng,
          lat: this.center.lat,
          pageNow: this.page
        };
        Request.postRequest(nearbyShop)
          .then(res => {
            console.log(res);
            if (res.result == 0) {
              for (let i in res.dataList) {
                res.dataList[i].star = Number(res.dataList[i].stars);
                  res.dataList[i].spacing=(Math.round(res.dataList[i].spacing/100)/10).toFixed(1)

              }
              this.dataList = res.dataList;
              console.log(this.dataList);
              wx.setStorage({
                key: 'nearbyShop',
                data: JSON.stringify(this.dataList),
               
              })
              this.donghua = false;
              if (this.dataList.length > 0) {
                this.nearyin = false;
              } else {
                this.nearyin = true;
              }
            } else if (res.result == "2") {
              this.$router.push("/fenghao");
            }
          })
          .catch(res => {});
    },
    init() {
      Toast("正在定位中，请稍等。。。");
      //我就是来定一下位
      let self = this;
      var map = new AMap.Map("container", {
        resizeEnable: true
      });
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 5000, //超过10秒后停止定位，默认：5s
          buttonPosition: "RB", //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(function(status, result) {
          if (status == "complete") {
            onComplete(result);
          } else {
            onError(result);
          }
        });
      });
      //解析定位结果
      function onComplete(data) {
        console.log(data);
        Toast("定位成功");
        let result = {};
        result.city = data.addressComponent.city;
        result.lng = data.position.lng;
        result.lat = data.position.lat;
        localStorage.setItem("point", JSON.stringify(result));
        self.nearbyShop();
      }
      //解析定位错误信息
      function onError(data) {
        Toast("定位失败，请手动定位");
        console.log(data);
      }
    },
    goDetailID(ID) {
    
      let url='/pages/shopdetails/index?id='+ID;
        console.log(ID,url)
      wx.navigateTo({
        url: url,
      })
      let IDs = {};
      IDs.id = ID;
      // localStorage.setItem("dianID", JSON.stringify(IDs));
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

.contain {
  width: 100%;
  padding-bottom: 50px;
  box-sizing: border-box;

  .head {
    width: 100%;
    height: 60px;
    padding: 10px 0.4rem 0;
    box-sizing: border-box;
    font-size: 15px;
    color: #333;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30;
    background: #fff;
    border-bottom: 1px solid #dedede;
  }

  .shop {
    width: 100%;
    border-top: 1px solid #eee;
    box-sizing: border-box;
    padding-top: 60px;
  }

  .kong {
    text-align: center;
    font-size: 14px;
    margin-top: 40px;
  }

  .shopkong {
    text-align: center;
    font-size: 14px;
    margin: 150px auto;
    height: 50px;
    border-radius: 10px;
    border: 1px solid #dedede;
    width: 40%;
    line-height: 50px;
  }
}
</style>
