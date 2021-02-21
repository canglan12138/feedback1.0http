<template>
  <scroll id="tabcontent">
    <div class="tabcontent-item">
      <div class="item" v-for="(item, index) in subcategories.list" :key="index">
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </div>
    <tab-control :titles="['综合', '新品', '销量']"></tab-control>
    <tab-content-detail :category-detail="categoryDetail"></tab-content-detail>
  </scroll>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";
  import TabControl from "../../../components/content/tabControl/TabControl";
  import TabContentDetail from "./TabContentDetail";

  export default {
    name: "TabContent",
    components: {
      Scroll,
      TabControl,
      TabContentDetail
    },
    props: {
      subcategories: {
        type: Object,
        default() {
          return {}
        }
      },
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  #tabcontent {
    height: calc(100% - 93px);
    overflow: hidden;
    flex: 1;
  }
  .tabcontent-item{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 15px;
  }
  .panel img {
    width: 100%;
  }

  .item {
    margin: 5px;
    width: 65px;
    height: 110px;
    text-align: center;
    font-size: 12px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>
