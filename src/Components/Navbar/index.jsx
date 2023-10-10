import { useContext } from "react"
import { NavLink } from "react-router-dom"
//import {ShoppingBagIcon} from '@heroicons/react/24/solid'
import { ShoppingCartContext } from "../../Context"
import ShoppingCart from '../ShoppingCart' 


const Navbar =()=>{
   
     const context = useContext(ShoppingCartContext)
     const activeStyle = 'underline underline-offset-4'
      
     //Sign out 
     const singOut = localStorage.getItem('sign-out')
     const parsedSignOut = JSON.parse(singOut)
     const isUserSingOut = context.singOut || parsedSignOut
     
     //Account 
     const account = localStorage.getItem('account')
     const parsedAccount = JSON.parse(account)
     
     //Has an account 
     const noAccountInlocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
     const noAccountInLocalState = context.account ? Object.keys (context.account).length === 0 : true
     const hasUserAccount = !noAccountInlocalStorage || !noAccountInLocalState
     // funcion para enviar la key local storage 
     const handleSignOut = () => { 
      const stringifiedSignOut = JSON.stringify(true)
      localStorage.setItem('sign-out', stringifiedSignOut)
      context.setSignOut(true)
      }
     
     const renderView = () => {
       if(hasUserAccount && !isUserSingOut){
         return(
         <>
         
         <li className="text-black/60">
            {parsedAccount?.email}
          </li> 
      
      
         <li>
           <NavLink
           to= '/my-orders'
           className = {({isActive}) => 
           isActive ? activeStyle : undefined
          }
           >
              My Orders
           </NavLink>
          </li> 
      
      
         <li>
           <NavLink
           to= '/my-account'
           className = {({isActive}) => 
           isActive ? activeStyle : undefined
          }
           >
              My Account
           </NavLink>
          </li> 
      
      
         <li>
           <NavLink
           to= '/signin'
           className = {({isActive}) => 
           isActive ? activeStyle : undefined
          }
          onClick={()=> handleSignOut()}
           >
              Sign out
           </NavLink>
          </li>
          
          
         
         
          </> 
                            
     )
       }else{
         return (
            <li>
                 <NavLink
                  to= '/signin'
                  className = {({isActive}) => 
                  isActive ? activeStyle : undefined
                 }
                 onClick={()=> handleSignOut()}
                  >
                     Sign out
                  </NavLink>
             </li> 
          )
      
         }}
   

     
  
 
    return(
         <nav className="flex justify-between item-center  fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white">
            <ul className="flex items-center gap-3">
               <li className="font-semibold text-lg">
                 <NavLink
                 to= {`${isUserSingOut? '/signin':'/'}`}
                 onClick={()=> context.setSearchByCategory("")}
                 >
                    shopi
                 </NavLink>
                </li> 
            
            
               <li>
                 <NavLink
                 to= '/'
                 onClick={()=> context.setSearchByCategory("")}
                 className = {({isActive}) => 
                 isActive ? activeStyle : undefined
                }
                 >
                    All
                 </NavLink>
                </li> 
            
            
               <li>
                 <NavLink
                 to= '/clothes'
                 onClick={()=> context.setSearchByCategory("clothing")}
                 className = {({isActive}) => 
                 isActive ? activeStyle : undefined
                }
                 >
                    Clothes
                 </NavLink>
                </li> 
            
            
               <li>
                 <NavLink
                 to= '/electronics'
                 onClick={()=> context.setSearchByCategory('electronics')}
                 className = {({isActive}) => 
                 isActive ? activeStyle : undefined
                }
                 >
                    Electronics
                 </NavLink>
                </li> 
            
            
               <li>
                 <NavLink
                 to= '/furnitures'
                 onClick={()=> context.setSearchByCategory('furnitures')}
                 className = {({isActive}) => 
                 isActive ? activeStyle : undefined
                }
                 >
                    Furnitures
                 </NavLink>
                </li> 
            
    
               <li>
                 <NavLink
                 to= '/Toys'
                 onClick={()=> context.setSearchByCategory('toys')}
                 className = {({isActive}) => 
                 isActive ? activeStyle : undefined
                }
                 >
                    Toys
                 </NavLink>
                </li> 
            
            
               <li>
                 <NavLink
                 to= '/Others'
                 onClick={()=> context.setSearchByCategory('others')}
                 className = {({isActive}) => 
                 isActive ? activeStyle : undefined
                }
                 >
                    Others
                 </NavLink>
                </li> 
            </ul>

            <ul className="flex items-center gap-3">
                
                {renderView()}

                <li className="flex items-center"> 
                
                    <ShoppingCart/>
                 
                </li>
            </ul>

         </nav>
    )
}

export default Navbar
