import PropTypes from 'prop-types';
import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Box,
  Grid,
  Fade,
  Modal,
  Paper,
  Stack,
  Button,
  Divider,
  Backdrop,
  Checkbox,
  TextField,
  IconButton,
  Typography,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';

import { AddProductSuccess } from './success';

// cid.config({
//   cloud_name: `${import.meta.env.VITE_CNARY_CLOUD_NAME}`, // Replace with your Cloudinary cloud name
//   api_key: `${import.meta.env.VITE_CNARY_API_KEY}`, // Replace with your Cloudinary API key
//   api_secret: `${import.meta.env.VITE_CNARY_API_SECRET}`, // Replace with your Cloudinary API secret
// });

const AddProductModal = ({ openAP, handleCloseAP }) => {
  const [filename, setFilename] = useState('Product Image');
  const [productName, setProductName] = useState('');
  const [variants, setVariants] = useState(1);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [onSale, setOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState(0);
  const [productImage, setProductImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', productImage);
      formData.append("upload_preset", `${import.meta.env.VITE_CNARY_UP_PRESET}`);
      formData.append("cloud_name", `${import.meta.env.VITE_CNARY_CLOUD_NAME}`);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CNARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const result = await response.json();
      console.log(result);  
  
      const responsepg = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/products/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "pname": productName,
            "fid" : localStorage.getItem("uid"),
            "variants": variants,
            "price": price,
            "stock": stock,
            "img_url": result.secure_url,
            "sale_status": onSale,
            "sale_price": salePrice,
          }),
        }
      );
      const data = await responsepg.json();
      if ( data.success ){
        setSuccess(true);
        setUploading(false);
      }
      setUploading(false);
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      setUploading(false);
    }
  };

  const handleCloser = () => {
    setProductName('');
    setVariants(1);
    setPrice(0);
    setStock(0);
    setOnSale(false);
    setSalePrice(0);
    setProductImage(null);
    setFilename('Product Image');
    handleCloseAP();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProductImage(reader.result);
    };

    reader.readAsDataURL(file);
    setFilename(file.name);
  };

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={openAP}
    >
      <Modal open={openAP} onClose={handleCloser} closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'scroll !important',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Fade in={openAP}>
        <Box sx={{ overflow: 'scroll', overflowX: 'hidden', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none', }, margin: 'auto', }} >
            <Grid
              container
              component={Paper}
              elevation={5}
              spacing={3}
              p={5}
              maxWidth="500px"
              sx={{
                overflow: 'scroll',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                margin: 'auto',
              }}
            >
              <Grid item xs={20}>
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h5">Add Product</Typography>
                    <IconButton
                      aria-label="close"
                      onClick={handleCloser}
                      sx={{ ml: 1.5 }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Stack>

                  <Stack spacing={2}>
                    <TextField
                      required
                      fullWidth
                      label="Product Name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      sx={{ borderRadius: '5px' }}
                    />
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{ width: '100%' }}
                    >
                      <Button
                        size="large"
                        color="secondary"
                        sx={{
                          borderRadius: 10,
                          width: '30%',
                          mb: 2,
                          color: 'white',
                          p: 2,
                        }}
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        disabled={uploading}
                      >
                        Upload
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          hidden
                        />
                      </Button>
                      <Typography variant="subtitle1">{filename}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={2}>
                  {productImage && (
                    <img
                      src={productImage}
                      alt="Product"
                      style={{
                        width: '100%',
                        height: 'auto',
                        border: '2px solid black',
                      }}
                    />
                  )}

                  <Divider />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={3} sx={{ width: '100%' }}>
                    <TextField
                      label="Variants"
                      type="number"
                      value={variants}
                      sx={{ width: '30%' }}
                      onChange={(e) =>
                        setVariants(parseInt(e.target.value, 10))
                      }
                    />
                    <TextField
                      required
                      fullWidth
                      type="number"
                      label="Stock"
                      value={stock}
                      sx={{ width: '30%' }}
                      onChange={(e) => setStock(parseInt(e.target.value, 10))}
                    />
                    <FormControl
                      sx={{ m: 1 }}
                      required
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Amount
                      </InputLabel>
                      <OutlinedInput
                        required
                        id="outlined-adornment-amount"
                        type="number"
                        value={price}
                        onChange={(e) =>
                          setPrice(parseFloat(e.target.value))
                        }
                        endAdornment={
                          <InputAdornment position="end">₹</InputAdornment>
                        }
                        label="Amount"
                      />
                    </FormControl>
                  </Stack>

                  <Divider sx={{ borderColor: 'black' }} />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Typography variant="h6">On Sale:</Typography>
                    <Checkbox
                      checked={onSale}
                      onChange={(e) => setOnSale(e.target.checked)}
                    />
                  </Stack>

                  {onSale && (
                    <TextField
                      fullWidth
                      type="number"
                      label="Sale Price"
                      value={salePrice}
                      onChange={(e) =>
                        setSalePrice(parseFloat(e.target.value))
                      }
                    />
                  )}

                  <Button
                    size="large"
                    color="inherit"
                    variant="contained"
                    onClick={handleProductSubmit}
                    disabled={uploading}
                  >
                    Add Product
                  </Button>
                  <AddProductSuccess openAPS={success} handlecloseAPS={() => {setSuccess(false);handleCloser();}} />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Backdrop>
  );
};

AddProductModal.propTypes = {
  openAP: PropTypes.bool,
  handleCloseAP: PropTypes.func,
};

export default AddProductModal;
