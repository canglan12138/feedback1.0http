<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item"
           v-for="(item,index) in categoryList"
           @click="clickTitle(index)"
           :class="{active: currentIndex === index}">{{item.title}}</div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";

  export default {
    name: "TabMenu",
    data() {
      return {
        currentIndex: 0
      }
    },
    components: {
      Scroll
    },
    props: {
      categoryList:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods: {
      clickTitle(index) {
        this.currentIndex = index
        this.$emit('selectItem', index)
      }
    },
  }
</script>

<style scoped>
  #tab-menu {
    height: calc(100% - 93px);
    width: 100px;
    overflow: hidden;
    background-color: #eee;
  }
  .menu-list-item {
    width: 100px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .active {
    background-color: #fff;
    color: var(--color-high-text);
    font-weight: 600;
    border-left: 3px solid var(--color-high-text);
  }
</style>
