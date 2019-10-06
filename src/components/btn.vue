<template>
  <div class='button'>
        <span>{{content}}</span>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';

export default {
  props:['content'],
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
.button{
  padding 10px 5px;
  box-sizing border-box;
  span{
    display block;
    height 45px;
    background #72D241;
    border-radius 6px;
    color:#fff;
    line-height 45px;
    text-align center;
    font-size 17px;
  }
}
</style>