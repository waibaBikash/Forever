import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = '$';
  const delivery_fee = 5;
  const [search,setSerach] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [carrItems, setCartItems] = useState({});


  const addToCart = async (itemId, size) => {

    if (!size) {
      toast.error('Select Produt Size');
      return;
    }
   
    let cartData = structuredClone(carrItems);
    if (cartData[itemId] ) {
       if (cartData[itemId][size]) {
        cartData[itemId[size]] += 1;

       }else{
        cartData[itemId][size] = 1;
       }
    }else{
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
     setCartItems(cartData);
  }

  const getCartCount = () =>{
    let totalCount = 0;
    for(const items in carrItems){
       for( const item in carrItems[items]){
          try {
            if (carrItems[items][item] > 0) {
              totalCount += carrItems[items][item];
            }
          } catch (error) {
            
          }
       }
    }
    return totalCount;
  }
  
  const value = {
     products, currency, delivery_fee,
     search,setSerach,showSearch,setShowSearch, carrItems, addToCart,
     getCartCount
  }
  return(
    <ShopContext.Provider value={value}>
       {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;

