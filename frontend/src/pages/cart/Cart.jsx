// @ts-nocheck

import {
  Box,
  Button,
  Paper,
  styled,
  IconButton,
  Badge,
   Typography, Divider, Stack,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import "./Cart.css";
import { Add, Remove } from "@mui/icons-material";
import { increment,decrement, deleted } from "../../Redux/CartSlice";
import { useSelector, useDispatch } from 'react-redux'
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#1976d2",
    color: "#fff",
  },
}));

const Cart = () => {
  const dispatch = useDispatch()
  const {selectedProducts} = useSelector((state) => state.carttt)
  console.log(selectedProducts)
  let subTotal=0;
  return (
    <Box>
      {selectedProducts.map((item) => {
        subTotal+=item.price*item.quantity
        return(
          <Paper key={item.id} dir="rtl" className="item-container">
          <div className="img-title-parent">
            <img src={item.imageLink[0]} alt="" />
            <p className="product-name">{item.productName}</p>
          </div>
  
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ color: "#1976d2", ml: "10px" }} onClick={() => {
              dispatch(increment(item))
            }}>
              <Add />
            </IconButton>
  
            <StyledBadge badgeContent={item.quantity} color="secondary" />
  
            <IconButton sx={{ color: "#1976d2", mr: "10px" }} onClick={() => {
              dispatch(decrement(item))
            }}>
              <Remove />
            </IconButton>
          </div>
  
          <div className="price">${item.price * item.quantity}</div>
          
            <Button onClick={() => {
              dispatch(deleted(item))
            }} sx={{display:{xs:"none",md:"block"}}}  variant="text" color="error">
            delete
          </Button> 
           <IconButton sx={{display:{xs:"block",md:"none"}}} color="error"   onClick={() => {
            dispatch(deleted(item))
           }}>
             <DeleteIcon/>
           </IconButton>
        </Paper>
        )
      
      })}
      
       <Paper  sx={{ width: "200px", mx: "auto", mt: "60px" }}>
        <Typography align="center" p={2} variant="h6">
          Cart Summary
        </Typography>

        <Divider />

        <Stack
          sx={{ justifyContent: "space-between", p: 1.2 }}
          direction={"row"}
        >
          <Typography variant="body1">Subtotal</Typography>
          <Typography variant="body1">{subTotal}</Typography>
        </Stack>

        <Divider />

        <Button fullWidth color="primary" variant="contained">
          CHECKOUT
        </Button>
      </Paper> 
    
    </Box>
    
    
  );
};

export default Cart;