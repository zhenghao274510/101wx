<template>
  <div class='subinfo'>
     <div class="content">
          <img src="" alt="">
          <div>
            <p>您的信息已提交平台进行审核 </p>
            <p>请耐心等待审核结果</p>
          </div>
           <span>回到个人中心</span>

     </div>
  </div> 
</template>

<script>
//import 《组件名称》 from '《组件路径》';

export default {
  data() {
    return {

    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  //方法集合
  methods: {

  },
  //生命周期 - 创建之前
  beforeCreate() {},
  //生命周期 - 挂载之前
  beforeMount() {},
  //生命周期 - 更新之前
  beforeUpdate() {},
  //生命周期 - 更新之后
  updated() {},
  //生命周期 - 销毁之前
  beforeDestroy() {},
  //生命周期 - 销毁完成
  destroyed() {},
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated() {},
}
</script>
<style scoped lang="stylus">
.content{
  display flex;
  flex-direction columns ;
  justify-content space-around;
  align-items center;
  height 3rem;
  img{
    width .6rem;
    height .6rem;
  }
  div{
    font-size .14rem;
    p{
      line-height .25rem;
    }
  }
  span{
    display block;
    width 3.06rem;
    height .44rem;
    color #fff;
    line-height .44rem;
    text-align center;
    margin .1rem auto ;
    font-size .15rem;
  }


}
</style>