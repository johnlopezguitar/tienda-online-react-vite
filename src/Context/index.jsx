import { createContext , useState , useEffect} from 'react';
import { PropTypes } from 'prop-types';

export const  ShoppingCartContext = createContext();

// llmando variables del localStorage
export const initiaLizeLocalStorage = () =>{
   const accountInLocalStorage = localStorage.getItem('account')
   const signOutInLocalStorage = localStorage.getItem('sing-out')
 
   let parsedAccount 
   let parsedSignOut
       
   if(!accountInLocalStorage){
     localStorage.setItem('account', JSON.stringify({}))
     parsedAccount = {}
   }else{
     parsedAccount = JSON.parse(accountInLocalStorage)
   }
   
   if(!signOutInLocalStorage){
     localStorage.setItem('sing-out', JSON.stringify(false))
     parsedSignOut = false
   }else {
     parsedSignOut = JSON.parse(signOutInLocalStorage)
   }
} 


export const ShoppingCartProvider =({children})=>{
        ShoppingCartProvider.propTypes ={
        children:
        PropTypes.node.isRequired,
        
    };

    //My account 
    const [account , setAccount] = useState({})

    //Sign out
    
    const [singOut , setSignOut] = useState(false)

 
    //sopping Cart * Increment quantity
    const [count , setCount] = useState(0)
    //console.log('COUNT:', count)
    //product Detail * Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen ] = useState(false)
    const openProductDetail = ()=>  setIsProductDetailOpen(true)
    const closeProductDetail = ()=> setIsProductDetailOpen(false)
   
    //Checkout Side Menu Detail * Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen ] = useState(false)
    const openCheckoutSideMenu = ()=>  setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = ()=> setIsCheckoutSideMenuOpen(false)
   


    //Product Detail Show product
    const [productToShow, setProductToShow]= useState({})
    
    //Shopping Cart . Add products to cart
    const [cartProducts, setCartProduct]= useState([])
    
    //Shopping Cart . Order
    const [order, setOrder] = useState([])
    

    //Get products
    
    const [items , setItem] = useState(null)
    
    const [filteredItems , setFilteredItems] = useState(null)
    
    // Get prducts by title
    const [searchByTitle , setSearchByTitle] = useState(null)
    console.log('searchByTitle :' , searchByTitle)
    
    //Get product by category
    const [searchByCategory , setSearchByCategory] = useState(null)
     console.log(searchByCategory)
     useEffect(()=>{
     fetch('https://fakestoreapi.com/products')
     .then(response => response.json())
     .then(data => setItem(data) )
     
  },[])
  
  const filteredItemsByTitle = (items , searchByTitle)=>{
    
   return items?.filter(item =>item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
  }
  

  const filteredItemsByCategory = (items , searchByCategory)=>{
    console.log( items)
   return items?.filter(item =>item.category.toLowerCase().includes(searchByCategory.toLowerCase()))
   
}
  
  const filterBy = (searchType , items , searchByTitle ,searchByCategory)=>{
   if ( searchType === 'BY_TITLE'){
     return  filteredItemsByTitle(items , searchByTitle) 
   }
   if(searchType === 'BY_CATEGORY'){
      return filteredItemsByCategory(items , searchByCategory)
   }
   if(searchType === 'BY_TITLE_AND_BY_CATEGORY'){
      return filteredItemsByCategory(items , searchByCategory).filter(item =>item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
   }
   if(!searchType ){
     return items
   }
  }

  useEffect(()=>{
   if( searchByTitle && searchByCategory ) setFilteredItems(filterBy('BY_TITLE_AND_BY_CATEGORY', items ,searchByTitle , searchByCategory))
   if(searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE' ,items, searchByTitle,searchByCategory))
   if(!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY',items ,searchByTitle, searchByCategory))
   if(!searchByTitle && !searchByCategory  ) setFilteredItems(filterBy(null ,items , searchByTitle ,searchByCategory))
   // eslint-disable-next-line react-hooks/exhaustive-deps
},[items , searchByTitle, searchByCategory, ])

   console.log('filteredItems' , filteredItems)
  return(
       < ShoppingCartContext.Provider value={{
         count,
         setCount,
         openProductDetail,
         closeProductDetail,
          isProductDetailOpen,
          productToShow,
          setProductToShow,
          cartProducts,
          setCartProduct,
          isCheckoutSideMenuOpen,
          openCheckoutSideMenu, 
          closeCheckoutSideMenu,
          order,
          setOrder,
          items,
          setItem,
          searchByTitle,
          setSearchByTitle,
          filteredItems,
          searchByCategory,
          setSearchByCategory,
          account,
          setAccount,
          singOut,
          setSignOut

       }}>
        {children}
     </ShoppingCartContext.Provider>
    )
}