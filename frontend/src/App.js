import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Root from "./pages/Root";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";



import NotFound from "./pages/NotFound";
import ProductDetails from "pages/details/ProductDetails";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="ProductDetails/:id" element={< ProductDetails />} />


      <Route path="*" element={<NotFound />} />

     
    </Route>
  )
);





function App() {



  return (
  
      
      <RouterProvider router={router} />
   
  );
}

export default App;
