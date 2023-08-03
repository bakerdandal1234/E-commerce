import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedProducts:localStorage.getItem("selectedProducts")? JSON.parse(localStorage.getItem("selectedProducts")):[],
  selectedProductsID: localStorage.getItem("selectedProductsID")? JSON.parse(localStorage.getItem("selectedProductsID")):[]
  
}

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productsWithQuantity={...action.payload,"quantity":1}
       state.selectedProducts.push( productsWithQuantity)
       state.selectedProductsID.push( action.payload.id)  ; 
       localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
       localStorage.setItem("selectedProductsID",JSON.stringify(state.selectedProductsID))
      console.log("add beautiful cart")
    },
    incrementByAmount: (state, action) => {
      //  state.value += action.payload 
    },
    increment: (state,action) => {
      const croissant=state.selectedProducts.find((item) => {
        return item.id===action.payload.id;
      }) ;
      croissant.quantity+=1
      localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
    },
    decrement: (state,action) => {
      const decroissant=state.selectedProducts.find((item) => {
        return item.id===action.payload.id;
      })
      decroissant.quantity-=1 
    
      if(decroissant.quantity===0){
        const newArray=state.selectedProducts.filter((item) => {
          return item.id!== action.payload.id
        })
        state.selectedProducts=newArray



        const newArrayy=state.selectedProductsID.filter((item) => {
          return item  !== action.payload.id
        })
        state.selectedProductsID=newArrayy
        localStorage.setItem("selectedProductsID",JSON.stringify(state.selectedProductsID))
        localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
      }
    },
    deleted: (state,action) => {
      const newArray=state.selectedProducts.filter((item) => {
        return item.id!== action.payload.id
      })
      state.selectedProducts=newArray



      const newArrayy=state.selectedProductsID.filter((item) => {
        return item  !== action.payload.id
      })
      state.selectedProductsID=newArrayy
      // state.deletedProduct=
      // state.value += action.payload
      console.log("doneeeeeeee deleted ")
      localStorage.setItem("selectedProductsID",JSON.stringify(state.selectedProductsID))
      localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
    },
  },
})

// Action creators are generated for each case reducer function
export const { incrementByAmount,increment,decrement,deleted,addToCart } = counterSlice.actions

export default counterSlice.reducer
