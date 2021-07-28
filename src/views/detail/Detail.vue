<template>
  <div id="detail">
    <!-- 导航 -->
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {debounce} from 'common/utils'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList
    },
    data(
        GoodsList) {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        itemImgListener: null,
        themeTopYs: [],
        currentIndex: 0
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      // this.iid = this.$route.query.iid
      // console.log(this.iid);

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result
        // 1.获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages
        // console.log(this.topImages);

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.取出评论的信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        /*
        // 1.第一次获取，值不对
        // 值不对的原因：this.$refs.params.$el压根没有渲染
        this.themeTopYs = [];

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

        console.log(this.themeTopYs);

        this.$nextTick(() => {
          // 2.第二次获取：值不对
          // 值不对的原因：图片没有计算在内
          // 根据最新的数据，对应的DOM是已经被渲染出来了
          // 但是图片依然是没有加载完的(目前获取到的offsetTop是不包含其中的图片)
          // offsetTop值不对的时候，都是因为图片的问题
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

          console.log(this.themeTopYs);
        })
        */
      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list;
        // console.log(this.recommends);
      })

      // 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
        console.log(this.themeTopYs);
      }, 100)
    },
    mounted() {
      const refresh  = debounce(this.$refs.scroll.refresh, 200)

      // this.itemImgListener = () => {
      //   refresh()
      // }

      // this.$bus.$on('itemImgLoad', this.itemImgListener)
      this.$bus.$on('detailItemImgLoad', () => {
        refresh()
      })

      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

      // console.log(this.themeTopYs);
    },
    // updated() {
    //   this.themeTopYs = [];

    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

    //   console.log(this.themeTopYs);
    // },
    destroyed() {
      // console.log('destroyed');
      // this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    methods: {
      imageLoad() {
        console.log('------');
        this.$refs.scroll.refresh();

        // this.themeTopYs = [];
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
        // console.log(this.themeTopYs);

        this.getThemeTopY()
      },
      titleClick(index) {
        console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 600)
      },
      contentScroll(position) {
        // console.log(position);
        // 1.获取y值
        const positionY = -position.y

        // 2.positionY和主题中的值进行对比
        let length = this.themeTopYs.length;
        for (let i = 0; i < length; i++) {
          if(this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i]
&& positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i])) {
            this.currentIndex = i;
            // console.log(this.currentIndex);
            //  console.log(i);
            this.$refs.nav.currentIndex = this.currentIndex
           }
        }
        // for (let i in this.themeTopYs) {
        //   if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
        //     console.log(i);
        //   }
        // }
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    background-color: #fff;
    z-index: 9;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
