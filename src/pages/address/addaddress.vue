<template>
  <div class="list">
    <!-- <main-header :text="text" @back="back"></main-header> -->
    <div class="box">
      <ul>
        <li>
          <span>联系人：</span>
          <input type="text" placeholder="请输入联系人的姓名" @blur="blur1" v-model="name" />
        </li>
        <li style="justify-content:center">
          <div
            class="common"
            :class="{active:itemIndex == k}"
            v-for="(v,k) in sex"
            :key="k"
            @click="change(k)"
          >{{v}}</div>
        </li>
        <li>
          <span>手机号：</span>
          <input type="number" placeholder="请输入联系人的电话" @blur="blur2" v-model="phone" />
        </li>
        <li @click="showAdd">
          <span>地址栏：</span>
          <input
            type="text"
            placeholder="请选择您的地理位置"
            disabled="disabled"
            id="cityName"
            style="background: none;"
            v-model="addr"
          />
          <img src="/static/img/dingwei.png" alt />
        </li>
        <li>
          <span>门牌号：</span>
          <input type="text" placeholder="请输入详细地址 如门牌号" @blur="blur3" v-model="add" />
        </li>
        <li>
          <van-checkbox v-model="checked" @click="checkbox(checked)">设为默认</van-checkbox>
        </li>
      </ul>
      <button @click="addbtn">保存</button>
    </div>
  </div>
</template>

<script>
// import MainHeader from "@/components/component/mainHeader";
// import { Popup, Toast, Checkbox, CheckboxGroup } from "vant";
// import Request from "@/common/js/request";
// import getCurrentCityName from "@/common/js/location";
export default {
  data() {
    return {
      text: "添加收货地址",
      radio: "1",
      checked: true,
      mo: 1,
      sex: ["女士", "先生"],
      itemIndex: 0,
      show: false,
      addr: "",
      lng: "",
      lat: "",
      province: "",
      city: "",
      town: "",
      name: "",
      phone: "",
      add: ""
    };
  },
  created() {},
  components: {},
  mounted() {
    wx.getStorage({
      key: "adduser",
      success(res) {
        let adduser = JSON.parse(res.data).adduser;
        this.name = adduser.name;
        this.phone = adduser.phone;
        this.addr = adduser.address.address;
        this.lng = adduser.address.lng;
        this.lat = adduser.address.lat;
        this.province = adduser.address.prov;
        this.city = adduser.address.city;
        this.town = adduser.address.town;
        this.add = adduser.address.addname;
      }
    });
  },
  methods: {
    back() {
      wx.removeStorage({
        key: "adduser",
        success: result => {},
        fail: () => {},
        complete: () => {}
      });
      // localStorage.removeItem("adduser");
      this.$router.push("/pages/address/addaddress");
    },
    change(k) {
      this.itemIndex = k;
      console.log(k);
    },
    checkbox(a) {
      if (a == true) {
        this.mo = 1;
      } else {
        this.mo = 0;
      }
    },
    showAdd() {
      this.$router.push("/pages/map/main");
      let adduser = {};
      adduser.name = this.name;
      adduser.phone = this.phone;
      wx.setStroage({
         key:'adduser',
         data:JSON.stringify(adduser)
      })
      // localStorage.setItem("adduser", JSON.stringify(adduser));
    },
    cancel() {
      this.show = false;
    },
    blur1(e) {
      this.name = e.target.value.replace(/(^\s*)/g, "");
    },
    blur2(e) {
      this.phone = e.target.value.replace(/(^\s*)/g, "");
    },
    blur3(e) {
      this.add = e.target.value.replace(/(^\s*)/g, "");
    },
    addbtn() {
      console.log("添加地址");
      console.log(this.mo, this.name, this.phone, this.add);
      if (
        this.name == "" ||
        this.phone == "" ||
        this.province == "" ||
        this.city == "" ||
        this.town == "" ||
        this.add == ""
      ) {
        Toast("信息不能为空");
      } else {
        let add = {
          cmd: "addAddress",
          cid: this.cid,
          receiverName: this.name,
          call: this.itemIndex,
          mobile: this.phone,
          province: this.province,
          city: this.city,
          town: this.town,
          addr: this.add,
          lon: this.lng,
          lat: this.lat,
          isDefault: this.mo
        };
        console.log(add);
      this.Request.post(add)
          .then(res => {
            console.log(res.data);
            if (res.data.result == "0") {
              Toast("添加地址成功");
              wx.removeStorage({
                key:'adduser'
              })
              // localStorage.removeItem("adduser");
              this.$router.push("/pages/address/main");
            } else if (res.data.result == "2") {
              this.$router.push("/pages/fenghao/main");
            }
          })
          .catch(res => {});
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.active {
  background: #72D141;
  color: #fff !important;
  border: none !important;
}

.list {
  width: 100%;
  height: 100%;

  .box {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding:15px 0 0;
    box-sizing: border-box;

    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      border-top: 1px solid #eee;

      li {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #333;
        padding: 0.2rem 0.3rem;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;

        span {
          display: inline-block;
          width: 2rem;
        }

        img {
          width: 0.4rem;
          height: 0.5rem;
          margin-left: 1rem;
        }

        .common {
          height: 0.7rem;
          line-height: 0.7rem;
          padding: 0 0.3rem;
          border: 1px solid #999;
          font-size: 14px;
          color: #999;
          border-radius: 4px;
          margin-right: 0.7rem;
        }
      }
    }

    button {
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      border: none;
      background: #72d141;
      color: #fff;
      height: 1.2rem;
    }
  }
}
</style>
