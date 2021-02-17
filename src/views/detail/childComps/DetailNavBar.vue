<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="clickBack">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             class="title-item"
             :class="{itemColor: index === currentIndex}"
              @click="clickItem(index)">{{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0,
      }
    },
    methods: {
      clickItem(index) {
        this.currentIndex = index;
      },
      clickBack() {
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
    font-size: 13px;
  }
  .itemColor {
    color: var(--color-high-text);
  }
  .back img {
    margin-top: 12px;
  }
</style>
