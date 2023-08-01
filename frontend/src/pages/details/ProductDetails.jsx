import { useGetoneproductsByNameQuery } from "Redux/productsApi";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { Badge, Box, Button, CircularProgress, IconButton, Typography, styled } from "@mui/material";
import DetailsThumb from "./DetailsThumb";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import { addToCart, decrement, increment } from "Redux/CartSlice";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -6,
    // top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const ProductDetails = () => {
  const productQuantity = (itemAPI) => {
    const myProduct = selectedProducts.find((itemUser) => {
      return itemUser.id === itemAPI.id;
    });

    return myProduct.quantity;
  };
  const dispatch = useDispatch();
  const { selectedProducts, selectedProductsID } = useSelector(
    // @ts-ignore
    (state) => state.carttt
  );
  let {id} = useParams();
  const { data, error, isLoading } = useGetoneproductsByNameQuery(id);
  const[index,setindex]=useState(0)
  console.log(data);
  const myRef = useRef(null);
  const handleTab = index =>{
    // this.setState({index: index})
    setindex(index)
    const images = myRef.current.children;
    for(let i=0; i<images.length; i++){
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };
  if (error) {
    return (
      <Typography variant="h1" color="error">
        error
      </Typography>
    );
  }
  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (data) {
    

    return (
      <div className="app details-page">
          <div className="details" >
            <div className="big-img">
              <img  src={data.imageLink[index]} alt="" />
            </div>

            <div className="box">
              <div className="row">
                <h2>{data.productName}</h2>
                <span>${data.price}</span>
              </div>
              {/* <Colors colors={item.colors} /> */}

              <p>{data.description}</p>

              <DetailsThumb
                images={data.imageLink}
                tab={handleTab}
                myRef={myRef}
              />
            {selectedProductsID.includes(data.id) ? <div  style={{ display: "flex", alignItems: "center" }}>
            <IconButton color="primary" sx={{ml: "10px"}}  onClick={() => {
              dispatch(increment(data))
            }}>
              <Add fontSize="small" />
            </IconButton>
  
            <StyledBadge   badgeContent={productQuantity(data)} color="primary" />
  
            <IconButton sx={{ml: "15px"}} color="primary"  onClick={() => {
              dispatch(decrement(data))
            }}>
              <Remove fontSize="small" />
            </IconButton>
          </div> :<Button onClick={() => {
                dispatch(addToCart(data))
              }} sx={{textTransform:"capitalize",p:1,lineHeight:1.1}} variant="contained" color="primary"  >
               <ShoppingCart sx={{fontSize:"18px",mr:1}}/> add card
              </Button>}
              {/* <button className="cart">Add to cart</button> */}
            </div>
          </div>
      </div>
    );
  }
  // return(
  //   <h1>baker dnl</h1>
  // )
};

export default ProductDetails;
