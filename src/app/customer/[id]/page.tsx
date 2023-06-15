"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import ProductCard from "../(components)/ProductCard";
import Container from "@mui/material/Container";
import Store from "@sdk/Store";
import { useGetProductsQuery } from "../../../redux/customer/product";
import type { Product } from "../../../types/type";

export default function Home() {
  const [products, setProducts] = React.useState([]);

  const { data, error, isLoading } = useGetProductsQuery();

  React.useEffect(() => {
    Store.getProducts()
      .then((res: any) => setProducts(res))
      .catch((err) => console.log(err));
  }, []);

  console.log(data);
  console.log(error);
  console.log(isLoading);

  return (
    <>
      {/*<Container maxWidth="xl">*/}
      <Divider textAlign="left" sx={{ my: 5 }}>
        <Typography variant="body1" color="inherit" fontWeight={900}>
          Sort by :
        </Typography>
      </Divider>
      <Stack
        direction="row"
        justifyContent={"center"}
        gap={3}
        flexWrap={"wrap"}
      >
        {products.map((product: Product, index: number) => (
          <ProductCard product={product} key={index} />
        ))}
      </Stack>
      {/* </Container> */}
    </>
  );
}
