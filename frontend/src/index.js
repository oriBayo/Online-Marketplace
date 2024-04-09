import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import './index.css'
import './bootstrap.min.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './store'
import { Provider } from 'react-redux'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { HelmetProvider } from 'react-helmet-async'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProductPage from './pages/ProductPage'
import ProfilePage from './pages/ProfilePage'
import RegistrationPage from './pages/RegistrationPage'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import ShippingPage from './pages/ShippingPage'
import PaymentPage from './pages/PaymentPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import OrderPage from './pages/OrderPage'
import ErrorPage from './pages/ErrorPage'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import OrderListPage from './pages/admin/OrderListPage'
import ProductListPage from './pages/admin/ProductListPage'
import ProductEditPage from './pages/admin/ProductEditPage'
import UsersListPage from './pages/admin/UsersListPage'
import UserEditPage from './pages/admin/UserEditPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        <Route index={true} path='/' Component={HomePage} />
        <Route path='products' Component={ProductsPage} />
        <Route path='products/page/:pageNum' Component={ProductsPage} />
        <Route path='products/search/:keyword' Component={ProductsPage} />
        <Route
          path='products/search/:keyword/page/:pageNum'
          Component={ProductsPage}
        />
        <Route path='products/:id' Component={ProductPage} />
        <Route path='register' Component={RegistrationPage} />
        <Route path='login' Component={LoginPage} />
        <Route path='cart/:id?' Component={CartPage} />
        <Route path='*' Component={ErrorPage} />

        <Route path='' Component={PrivateRoute}>
          <Route path='shipping' Component={ShippingPage} />
          <Route path='placeorder' Component={PlaceOrderPage} />
          <Route path='payment' Component={PaymentPage} />
          <Route path='order/:id' Component={OrderPage} />
          <Route path='profile' Component={ProfilePage} />
        </Route>

        <Route path='' Component={AdminRoute}>
          <Route path='admin/orderlist' Component={OrderListPage} />
          <Route path='admin/productlist' Component={ProductListPage} />
          <Route
            path='admin/productlist/:pageNum'
            Component={ProductListPage}
          />
          <Route path='admin/products/:id' Component={ProductEditPage} />
          <Route path='admin/userlist' Component={UsersListPage} />
          <Route path='admin/users/:id' Component={UserEditPage} />
        </Route>
      </Route>
    </>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
)

reportWebVitals()
