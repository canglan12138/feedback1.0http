<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categoryList="categoryList" @selectItem="selectItem"></tab-menu>
      <tab-content :subcategories="showSubcategory"
                   :category-detail="showCategoryDetail"></tab-content>
    </div>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import TabMenu from "./childCategory/TabMenu";
  import TabContent from "./childCategory/TabContent";

  import {POP, SELL, NEW} from "@/common/const";
  import {getCategory,getSubcategory,getCategoryDetail} from "../../network/category";

  export default {
    name: "Category",
    components: {
      NavBar,
      TabMenu,
      TabContent
    },
    data(){
      return {
        categoryList: [],
        categoryData:{},
        currentIndex: -1
      }
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    created() {
      this.getCategory()
    },
    methods: {
      getCategory() {
        getCategory().then(res => {
          console.log(res);
          this.categoryList = res.data.category.list;
          for (let i = 0; i < this.categoryList.length; i++) {
            this.categoryData[i] = {
              subcategoriess:{},
              categoryDetail:{
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          this.getSubcategories(0)
        })
      },
      getSubcategories(index) {
        this.currentIndex = index;
        const mailKey = this.categoryList[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
            this.getCategoryDetail(POP)
            this.getCategoryDetail(SELL)
            this.getCategoryDetail(NEW)
        })
      },
      getCategoryDetail(type) {
        const miniWallkey = this.categoryList[this.currentIndex].miniWallkey;
        getCategoryDetail(miniWallkey, type).then(res => {
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      selectItem(index) {
        this.getSubcategories(index)
      }
    }
  }
</script>

<style scoped>
  #category {
    padding-top: 44px;
  }
  .content {
    height: 100vh;
    display: flex;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 500;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
</style>
