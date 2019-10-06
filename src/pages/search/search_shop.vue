<template>
  <div class="list">
    <div class="shop">
      <van-tabs
        v-model="active"
        color="rgb(114,209,65)"
        title-active-color="rgb(114,209,65)"
        @click="sort"
        @change="sort"
        :swipeable="true"
        :sticky="true"
        :offset-top="42"
      >
        <van-tab title="综合排序">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
            v-if="!show"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <recommendfen :recommend="showList" @goDetail="goDetail"></recommendfen>
            </van-pull-refresh>
          </van-list>
        </van-tab>
        <van-tab title="好评优先">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
            v-if="!show"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <recommendfen :recommend="showList"></recommendfen>
            </van-pull-refresh>
          </van-list>
        </van-tab>
        <van-tab title="价格优先">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
            v-if="!show"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <recommendfen :recommend="showList"></recommendfen>
            </van-pull-refresh>
          </van-list>
        </van-tab>
        <van-tab title="销量优先">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
            v-if="!show"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <recommendfen :recommend="showList"></recommendfen>
            </van-pull-refresh>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
    <div class="no" v-if="show">暂没有搜索的商品</div>
  </div>
</template>

<script>
import Recommendfen from "@/components/recommendfen";

export default {
  data() {
    return {
      text: "分类名称",
      active: 0,
      list: [],
      isLoading: false,
      loading: false,
      finished: false,
      sorts: 0,
      page: 1,
      show: false,
      recommend: [],
      id: this.$route.params.id,
      ink: ""
    };
  },
  components: {
    Recommendfen,
  },
  created() {

  },
  mounted() {
       console.log(this.$route.params);
  },
  computed: {
    showList() {
      return this.list;
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        name: "goods_detailfen",
        params: {
          id: id
        }
      });
      let ID = {};
      ID.id = id;

      // localStorage.setItem("fen-shopID", JSON.stringify(ID));
    },
    back() {
      this.$router.push('/classify');
    },
    onRefresh: function() {
      var self = this;
      this.list = [];
      this.page = 1;
      this.finished = false;
      this.onLoad();
      setTimeout(function() {
        Toast("刷新成功");
        self.isLoading = false;
      }, 500);
    },
    onLoad: function() {
      let self = this;
      let Category = {
        cmd: "selectGoodsByCategory",
        orderType: this.sorts,
        id: this.id,
        pageNow: this.page
      };
      console.log(Category)
      this.Request.post(Category)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            this.text = res.data.categoryName;
            if (res.data.dataList.length > 0) {
              self.show = false;
              if (self.page <= res.data.totalPage) {
                for (var i = 0; i < res.data.dataList.length; i++) {
                  self.list.push(res.data.dataList[i]);
                }
                self.page++;
                // 加载状态结束
                self.loading = false;
              } else {
                self.loading = false;
                self.finished = true;
              }
            } else if (
              res.data.dataList !== undefined ||
              res.data.dataList.length == 0
            ) {
              self.show = true;
            }
          } else if (res.data.result == 1) {
            self.show = true;
          }
        })
        .catch(res => {});
    },
    sort(k) {
      let self = this;
      this.sorts = k;
      this.clear();
      this.onLoad();
    },
    clear() {
      this.list = [];
      this.page = 1;
      this.finished = false;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.no {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #333;
  top: 124px;
  left: 0;
  bottom: 0;
  z-index: 999;
}

.van-tabs__wrap {
  position: fixed !important;
}

.list {
  width: 100%;

  .shop {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 50px;
  }
}
</style>
