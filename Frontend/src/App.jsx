
import './App.css'
import { Header } from './pages/nav/header'
import { Order } from './pages/orderPage/order'
import { Product } from './pages/productPage/product'
import {Login} from "./pages/loginPage/login.jsx"
import {Register} from "./pages/registerPage/register.jsx"

function App() {
  

  return (
    <div className="app-component">  
      <Header/>
      <Register/>
      <Login/>
      <Product/>
      <Order/>
    </div>
  )
}

export default App
