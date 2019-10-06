<template>
  <div class="list">
    <div class="search">
      <div class="type">
 <select>
  <option :value="v.text" v-for="v in options" :key="v">{{v.text}}</option>
</select>
      </div>
      <div class="search_input">
        <van-search placeholder="请输入搜索关键词" v-model="value1" />
      </div>
      <span @click="goSearch">搜索</span>
    </div>
    <div class="history">
      <div class="h_box">
        <span>历史搜索</span>
        <img src="/static/img/delete.png" alt @click="remove" />
      </div>
      <ul class="h_list">
        <li
          v-for="(item,index) in this.searchList"
          :key="index"
          @click="goSearchs(item.val)"
        >{{item.val}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Request from "@/common/js/request";

export default {
  data() {
    return {
      value: 0,
      value1: "",
      options: [
        {
          value: 1,
          text: "商品"
        },
        {
          value: 2,
          text: "商家"
        }
      ],
      searchList: []
    };
  },
  created() {
    
  },
  mounted() {
   this.shou();
  },
  methods: {
    remove() {
      wx.removeStorage({
        key: 'search',
        success: function(res){
          // success
        },
      })
      this.shou();
    },
    shou() {
      wx.getStorage({
        key: 'search',
        success: function(res){
          // success
          this.searchList =JSON.parse(res.data)
        }
    
      })
      
    },
    goSearch() {
      if (this.value == 1) {
        if (this.value1 == "") {
            wx.showToast({
            title:"搜索内容不能为空"
          })
          return;
        }
        this.$router.push("/pages/search/search_product");
        let shopseach = {};
        shopseach.name = this.value1;
        wx.setStorage({
          key: 'shopseach',
          data: JSON.stringify(shopseach)
        })
      } else if (this.value == 2) {
        if (this.value1 == "") {
          wx.showToast({
            title:"搜索内容不能为空"
          })
          return;
        }
        let url="/pages/search/search_shop?name="+this.value1;
        this.$router.push(url);
        let shopssearch = {};
        shopssearch.name = this.value1;
        wx.setStorage({
          key: 'shopssearch',
          data: JSON.stringify(shopssearch),
        })
    
      }
      console.log(this.value1);
      let list = {
        val: this.value1
      };
      let searchArr=[]
      wx.getStorage({
        key: 'search',
        success: function(res){
          // success
       searchArr=JSON.stringify(res.data);
        },
      })
     
      searchArr.unshift(list);
        wx.setStorage({
          key: 'search',
          data: JSON.stringify(searchArr)        
        })
    },
    back() {
      this.$router.go(-1);
    },
    goSearchs(val) {
      console.log(val);
      if (this.value == 1) {
        this.$router.push('/pages/search/search_product');
        let shopseach = {};
        shopseach.name = val;
         wx.setStorage({
          key: 'shopseach',
          data: JSON.stringify(shopseach)        
        })
      } else if (this.value == 2) {
        this.$router.push('/pages/search/search_shop');
        let shopssearch = {};
        shopssearch.name = val;
        wx.setStorage({
          key: 'shopssearch',
          data: JSON.stringify(shopssearch)        
        })
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
// @import '../common/stylus/variable';
.list {
  width: 100%;

  .search {
    width: 100%;
    height: 80px;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 0.3rem;
      height: 0.5rem;
    }

    .type {
      width: 24%;
      height: 34px;
      margin-left: 0.2rem;
    }

    .search_input {
      width: 60%;
    }

    span {
      font-size: 14px;
      color: #333;
    }
  }

  .history {
    width: 100%;
    padding: 0.4rem;
    box-sizing: border-box;
    border-top: 1px solid #eee;

    .h_box {
      width: 100%;
      padding: 0 0.1rem 0 0.2rem;
      box-sizing: border-box;
      border-left: 4px solid #6ed240;
      height: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        font-size: 14px;
        color: #999;
      }

      img {
        width: 0.5rem;
        height: 0.6rem;
      }
    }

    .h_list {
      width: 100%;
      display: flex;
      margin-top: 0.5rem;
      flex-wrap: wrap;

      li {
        padding: 0 18px;
        height: 0.8rem;
        line-height: 0.8rem;
        background: #F7F8FA;
        border-radius: 20px;
        font-size: 14px;
        color: #333;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>
