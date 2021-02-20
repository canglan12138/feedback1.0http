<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImage"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addcart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
<!--    <toast :message="message" :show="show"/>-->
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";
  // import Toast from "../../components/common/toast/Toast";

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail";
  import {itemListenerMixin,backTopMixin} from 'common/mixin'
  import {debounce} from "../../common/utils";
  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      // Toast
    },
    mixins: [itemListenerMixin,backTopMixin],
    data() {
      return {
        iid: null,
        topImage: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs:[],
        getThemeTopY: null,
        // message: '',
        // show: false
      }
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position) {
        //1.获取y值
        const positionY = - position.y
        //2.positionY和主题中的值进行对比
        //内容滚动，显示对应的标题
        let length = this.themeTopYs.length
        for (let i = 0; i < length-1; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY
          < this.themeTopYs[i+1])) {
            this.currentIndex = i;
              this.$refs.nav.currentIndex = this.currentIndex
          }
          // if(this.currentIndex !== i && ((i<length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||
          //   (i === length - 1 && positionY >= this.themeTopYs[i]))) {
          //   this.currentIndex = i;
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }
        }
        //是否显示回到顶部
        this.listenShowBack(position)
      },
      addToCart() {
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImage[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //2.商品提交到store(Promise,mapActions)
        this.addCart(product).then((res) => {
          // console.log(res);
          // this.show = true;
          // this.message = res;
          // setTimeout(() => {
          //   this.show =false;
          //   this.message = '';
          // },1500)
          this.$toast.show(res,2000)
        })
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // })
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res);
        //1.获取数据
        const data = res.result
        //2.获取顶部的图片轮播数据
        this.topImage = res.result.itemInfo.topImages
        //3.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //4.创建店铺信息
        this.shop = new Shop(data.shopInfo)
        //5.保存商品的详情数据
        this.detailInfo = data.detailInfo
        //6.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //7.取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        //根据最新的数据，渲染DOM
        //但是图片没有加载完成，目前获取到的offsetTop不包含图片
        // this.$nextTick(() => {
        //   this.thiemeTopYs = []
        //   this.thiemeTopYs.push(0)
        //   this.thiemeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.thiemeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.thiemeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // })
      })
      //3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
      //4.给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      },100)
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImgListener)
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
    z-index: 9;
    background-color: #ffffff;
  }
  .content {
    height: calc(100% - 44px - 52px);
  }
</style>
