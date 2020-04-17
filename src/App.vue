<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view v-if="isAlive"/>

    <input v-model="value" type="text" v-validate="'required|email'" name="email" data-vv-scope="login" data-vv-validate-on="blur">
    <p v-show="errors.has('login.email')">{{ errors.first('login.email') }}</p> 
    <button @click="onDemo">确定</button>


  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isAlive: true,
      value: ''
    }
  },
  methods: {
    reload() {
      this.isAlive = false
      this.$nextTick(function () {
        this.isAlive = true
      })
    },
    onDemo() {
      this.$validator.validateAll('login').then(res => {
        console.log(res)
      })
    }
  },
  created() {
    this.$http.index()
    .then(res =>{
      console.log(res)
    })
    const baseSize = 32
    // 设置 rem 函数
    function setRem () {
      // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
      const scale = document.documentElement.clientWidth / 375
      // 设置页面根节点字体大小
      document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
    }
    // 初始化
    setRem()
    // 改变窗口大小时重新设置 rem
    window.onresize = function () {
      setRem()
    }

    document.addEventListener('touchstart',function (event) {
      if(event.touches.length>1){
        event.preventDefault();
      }
    });
    var lastTouchEnd=0;
    document.addEventListener('touchend',function (event) {
      var now=(new Date()).getTime();
      if(now-lastTouchEnd<=300){
        event.preventDefault();
      }
      lastTouchEnd=now;
    },false);
    document.addEventListener('gesturestart', function (event) {
      event.preventDefault();
    });
    window.onpopstate = e =>{ 
      let isPath = this.$store.getters.isPath,
          isPathAll = ['indent', 'orderPay', 'orderGoods']
      isPathAll.forEach(item => {
        item == isPath ? (this.$router.push('/order'), this.$store.dispatch("isPath", "")) : ''
      })
    };
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
