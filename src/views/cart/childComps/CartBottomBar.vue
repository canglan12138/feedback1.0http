<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll"
                    class="check-button"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totlaPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totlaPrice() {
        return '￥' + this.$store.state.carList.filter(item => {
         return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.carList.filter(item => item.checked).length
      },
      isSelectAll() {
        //过滤出没有选中的
        // if (this.cartList.length === 0) return false
        // return !(this.cartList.filter(item => !item.checked).length)
        //find函数
        if (this.cartList.length === 0) return false
        return !this.cartList.find(item => !item.checked)
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        }else {
          this.cartList.forEach(item => item.checked = true)
        }
        // if (this.isSelectAll) {
        //   for (let item of this.cartList) {
        //     item.checked = false
        //   }
        // }else {
        //   for (let item of this.cartList) {
        //     item.checked = true
        //   }
        // }
      },
      calcClick() {
        if (!this.isSelectAll) {
          this.$toast.show('请选择商品')
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    display: flex;

    position: relative;
    line-height: 40px;

    background-color: #eee;
    font-size: 15px;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 70px;
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
    background-color: yellow;
    text-align: center;
  }
</style>
