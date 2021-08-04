<template>
  <div class="cart">
    <!-- <nav-bar class="nav-bar"><div slot="center">购物车({{cartLength}})</div></nav-bar> -->
    <!-- 导航 -->
    <nav-bar class="nav-bar"><div slot="center">购物车({{length}})</div></nav-bar>
    <!-- 商品的列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-botton-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import CartList from './childComps/CartList';
  import CartBottonBar from './childComps/CartBottonBar.vue';

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottonBar
    },
    computed: {
      // cartLength() {
      //   // return this.$store.state.cartList.length
      //   return this.$store.state.cartLength()
      // }

      // 两种语法
      // ...mapGetters(['cartLength', 'cartList'])
      ...mapGetters({
        length: 'cartLength',
        // list: 'cartList'
      })
    },
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
