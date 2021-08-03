<template>
  <div class="botton-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate"  @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkbutton/CheckButton'

  import {mapGetters} from 'vuex'

  export default {
    name: 'CartBottonBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        // return '￥' + this.$store.state.cartList.filter(item => {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        // return this.$store.state.cartList.filter(item => item.checked).length
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        // if(this.cartList.length === 0) {return false}
        if(this.cartList.length === 0) return false
        // 1.使用filter
        // return !(this.cartList.filter(item => !item.checked).length)
        // 2.使用find
        return !this.cartList.find(item => !item.checked)
        // 3.普通遍历
        // for(let item of this.cartList) {
        //   if(!item.checked) {
        //     return false
        //   }
        // }
        // return true
      }
    },
    methods: {
      checkClick() {
        // console.log('-----');
        if(this.isSelectAll) {  // 全部选中
          this.cartList.forEach(item => item.checked = false)
        }else {  // 部分或全部不选中
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if(!this.isSelectAll) {
          this.$toast.show('请选择购买的商品', 1500)
        }
      }
    }
  }
</script>

<style scoped>
  .botton-bar {
    position: relative;
    display: flex;

    line-height: 40px;
    height: 40px;
    background-color: #eee;
    font-size: 14px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>
