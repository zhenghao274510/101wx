<template>
  <div class="all">
    <div class="contains">
      <div class="nav-item" v-for="(item,index) in datas" :key="index" v-if="index<9">
        <img :src="item.icon" alt @click.stop="classify(item.id)" lazy-load />
        <span>{{item.name}}</span>
      </div>
      <div class="nav-item xia" @click.stop="fenlei">
        <img src="/static/img/tilogo.png" alt  />
        <span>更多</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    datas: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    classify(id) {
      wx.navigateTo({
        url: "/pages/class/oneclass?id=" + id
      });
    },
    fenlei() {
		console.log(111)
		   wx.switchTab({
			   url:"/pages/tarba/class"			  
		   })
	}
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.all {
  width: 100%;
  position: relative;

  .contains {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;

    .nav-item {
      width: 20%;
      margin-top: 10px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }

      span {
        font-size: 12px;
        color: #666;
        margin-top: 7px;
      }
    }
  }
}
</style>
