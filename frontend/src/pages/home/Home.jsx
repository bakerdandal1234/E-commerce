
import {  Box, Stack, Button, useTheme, CircularProgress, IconButton, Badge, styled } from '@mui/material';
import Card from '@mui/material/Card';

import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { useGetproductsByNameQuery } from '../../Redux/productsApi'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decrement, increment } from 'Redux/CartSlice';
import { Add, Remove, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    
  },
}));
const Home = () => {
   const navigate=useNavigate()
  // @ts-ignore
  const {selectedProducts,selectedProductsID }= useSelector((state) => state.carttt)
  const dispatch = useDispatch();


 const theme=useTheme();
 const { data, error, isLoading } = useGetproductsByNameQuery()
 console.log(data)
 const productQuantity = (itemAPI) => {
  const myProduct = selectedProducts.find((itemUser) => {
    return itemUser.id === itemAPI.id;
  });

  return myProduct.quantity;
};
 console.log(data)
    if(error){
      return(
        <Typography variant="h1" color="error">error</Typography>
      )
    }
    if(isLoading){
      return(
        <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
      )
    }
    if(data){
      return(
        <Stack direction="row" flexWrap="wrap" justifyContent="center">
        {data.map((item) => {
          return(
            <Card  key={item.id} sx={{ maxWidth:250,mb:6,mr:2,"&:hover":{scale:"1.01",transition:"all 0.2s",transform:"rotate(0.5deg)"}}}>
            <CardMedia
              component="img"
              height="250"
              image={item.imageLink[0]}
              alt="Paella dish"
              onClick={() => {
                navigate(`ProductDetails/${item.id}`)
              }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
              {item.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
          {selectedProductsID.includes(item.id) ? <div dir="rtl" style={{ display: "flex", alignItems: "center" }}>
            <IconButton color="primary" sx={{ml: "10px"}}  onClick={() => {
              dispatch(increment(item))
            }}>
              <Add fontSize="small" />
            </IconButton>
  
            <StyledBadge   badgeContent={productQuantity(item)} color="primary" />
  
            <IconButton sx={{mr: "10px"}} color="primary"  onClick={() => {
              dispatch(decrement(item))
            }}>
              <Remove fontSize="small" />
            </IconButton>
          </div> :<Button onClick={() => {
                dispatch(addToCart(item))
              }} sx={{textTransform:"capitalize",p:1,lineHeight:1.1}} variant="contained" color="primary"  >
               <ShoppingCart sx={{fontSize:"18px",mr:1}}/> add card
              </Button>}
        
              
          
              
              <Box sx={{flexGrow:"1"}}/>
              <Typography sx={{mr:1}} variant="h6" color={theme.palette.error.light} >${item.price  }</Typography>
            </CardActions>
          </Card>
          )
        })}
        
    
      </Stack>
      )
    }
}

export default Home;


