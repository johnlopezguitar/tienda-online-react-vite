import { useContext } from 'react'
import{useRoutes , BrowserRouter,Navigate} from 'react-router-dom'
import { ShoppingCartProvider , initiaLizeLocalStorage, ShoppingCartContext} from '../../Context'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SingIn from '../SignIn'
import Navbar from '../../Components/Navbar'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import '../../App.css'

const AppRoutes =  ()=>{
  const context = useContext(ShoppingCartContext)
  //Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse (account)
  //Sign Out
  const signOut = localStorage.getItem('sign-out')
  const parsedSignOut = JSON.parse(signOut) 
  
  //Has an account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = Object.keys(context.account).length === 0
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState
  const isUserSignOut =context.signOut || parsedSignOut 



  let routes = useRoutes([
    {path: '/',element: hasUserAnAccount && !isUserSignOut? <Home/>: <Navigate replace to={'/signin'}/>},
    {path: '/clothes',element:hasUserAnAccount && !isUserSignOut? <Home/> : <Navigate replace to= {'/signin'}/> },
    {path: '/electronics',element: hasUserAnAccount && !isUserSignOut ? <Home/> : <Navigate replace to={'/signin'}/> },
    {path: '/furnitures',element: hasUserAnAccount && !isUserSignOut? <Home/> : <Navigate replace to={'/signin'} />},
    {path: '/toys',element: hasUserAnAccount && !isUserSignOut? <Home/> : <Navigate replace to={'/signin'} />},
    {path: '/others',element: hasUserAnAccount && !isUserSignOut? <Home/> : <Navigate replace to={'/signin'} />},
    {path: '/my-account',element:<MyAccount/>},
    {path: '/my-order',element:<MyOrder/>},
    {path: '/my-orders',element:<MyOrders/>},
    {path: '/my-orders/last',element:<MyOrder/>},
    {path: '/my-orders/:id',element:<MyOrder/>},
    {path: '/signin',element:<SingIn/>},

    {path: '/*',element:<NotFound/>}
  ])

  return routes
}

const App =()=>{
  initiaLizeLocalStorage()
  return (

    <ShoppingCartProvider>
      <BrowserRouter>
            <AppRoutes/>
            <Navbar/>
            <CheckoutSideMenu/>
      </BrowserRouter>
    </ShoppingCartProvider>
      
  )
}

export default App
