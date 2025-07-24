"use client"
// import React from "react"
import { SessionProvider } from "next-auth/react"
import { useState, useEffect } from "react"
import { createContext } from "react"
export const CartContext = createContext({})

const SessionWrapper=({children})=>{
    const [cartProducts, setcartProducts] = useState([])

    const ls = typeof window !== "undefined"?window.localStorage:null;
useEffect(()=>{
if(ls && ls.getItem("cart")){
    setcartProducts(JSON.parse(ls.getItem("cart")))
}
},[])

    function saveCartProductstoLocalStorage(){
if(ls){
    ls.setItem("cart",JSON.stringify(cartProducts))
}
    }
    function clearCart(){
        setcartProducts([])
        saveCartProductstoLocalStorage([])
    }
    function removeCartProduct(indexToRemove){
        setcartProducts(e=>{
            const newCartProducts = e.filter((v,index)=>index !==indexToRemove)
            saveCartProductstoLocalStorage(newCartProducts)
            return newCartProducts;
    
        })
    }
    const addtocart=(product,size=null,extras=[])=>{
setcartProducts(e=>{
    const cartProduct={...product,size,extras}
    const newProducts=[...e,cartProduct]
    saveCartProductstoLocalStorage(newProducts)
    return newProducts;
})
    }
    return (
        <div>
             <SessionProvider>
                <CartContext.Provider value={{cartProducts,setcartProducts,addtocart,removeCartProduct,clearCart}}>
                {children}
                </CartContext.Provider>
             
             </SessionProvider>
        </div>
    )
}

export default SessionWrapper