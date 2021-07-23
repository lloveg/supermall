<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goods" :key="index" :goods-item="item" class="item"/>
    <!-- {{goods}} -->
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem.vue";

  export default {
    name: 'GoodsList',
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  /* .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-around;
  }

  .goods-list .item {
    width: 48%;
  } */
  .goods {
    overflow: hidden;

    display: flex;
    flex-wrap: wrap;
    padding: 4px;
    justify-content: space-around;
  }
</style>
