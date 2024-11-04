import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import { Container, HStack, Button, RadioGroup, Radio } from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponenet from "./ErrorComponenet";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("bdt");

  const changePage = (page) => {
    setPage(page);
    setloading(true);
  };

  const btns = new Array(100).fill(1);

  let currencysymbol =
    currency === "bdt"
      ? "৳"
      : currency === "inr"
      ? "₹"
      : currency === "eur"
      ? "€"
      : "$";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        console.log(data);
        setloading(false);
      } catch (error) {
        setError(true);
        setloading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) {
    return (
      <ErrorComponenet msg={"There Occured Some Error During Fetching Coins"} />
    );
  }


  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup p={"8"} value={"currency"} onChange={setCurrency}>
            <HStack spacing={"8"} >
              <Radio value={"bdt"}>৳ BDT</Radio>
              <Radio value={"inr"}>₹ INR</Radio>
              <Radio value={"usd"}>$ USD</Radio>
              <Radio value={"eur"}>€ EUR</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
              <CoinCard
                id={i.id}
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                price={i.current_price}
                currencysymbol={currencysymbol}
              />
            ))}
          </HStack>

          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {btns.map((item, index) => (
              <Button
              key={index}
                bgColor={"blackAlpha.700"}
                onClick={() => changePage(index + 1)}
                // variant={"solid"}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
