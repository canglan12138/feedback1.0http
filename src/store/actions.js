import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-type";

export default {
  //修改state状态
  addCart(context,payload) {
    return new Promise((resolve,reject) => {
      //payload新添加的商品
      let oldProduct = null;
      for (let item of context.state.carList) {
        if (item.iid === payload.iid) {
          oldProduct = item
        }
      }
      //判断oldProduct
      if (oldProduct) {
        // oldProduct.count +=1
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前商品数量+1')
      }else {
        payload.count = 1
        // context.commit.carList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resolve('添加了新的商品')
      }
    })
  }
}
