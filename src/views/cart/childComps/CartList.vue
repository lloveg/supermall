<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <!-- <li v-for="(item, index) in cartList" :key="index">{{item}}</li> -->
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  import CartListItem from './CartListItem'

  import {mapGetters} from 'vuex'

  export default {
    name: 'CartList',
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }

  .content {
    height: 100%;
    overflow: hidden;

    /* position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0; */
  }
</style>
