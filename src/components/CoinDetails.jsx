import {
  Container,
  Box,
  RadioGroup,
  HStack,
  Radio,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Button,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import ErrorComponenet from "./ErrorComponenet";
import Chart from "./Chart";

import { server } from "../index";
import axios from "axios";

const CoinDetails = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("bdt");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  let currencysymbol =
    currency === "bdt"
      ? "৳"
      : currency === "inr"
      ? "₹"
      : currency === "eur"
      ? "€"
      : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];
  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setloading(true);
        break;
      case "7d":
        setDays("7d");
        setloading(true);
        break;
      case "14d":
        setDays("14d");
        setloading(true);
        break;
      case "30d":
        setDays("30d");
        setloading(true);
        break;
      case "60d":
        setDays("60d");
        setloading(true);
        break;
      case "200d":
        setDays("200d");
        setloading(true);
        break;
      case "1y":
        setDays("365d");
        setloading(true);
        break;
      case "max":
        setDays("max");
        setloading(true);
        break;
      default:
        setDays("24h");
        setloading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        setCoin(data);
        setloading(false);
        setChartArray(chartData.prices);
      } catch (error) {
        setError(true);
        setloading(false);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);

  if (error) {
    return (
      <ErrorComponenet msg={"There Occured Some Error During Fetching Coins"} />
    );
  }

  return (
    <Container maxW={"container.lg"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box w={"full"} borderWidth={1}>
            <Chart arr={chartArray} currency={currencysymbol} days={days} />
          </Box>

          <HStack p={"4"} overflowX={"auto"} justifyContent={"center"}>
            {btns.map((i) => (
              <Button key={i} onClick={() => switchChartStats(i)}>
                {i}
              </Button>
            ))}
          </HStack>

          <RadioGroup p={"8"} value={"currency"} onChange={setCurrency}>
            <HStack spacing={"8"}>
              <Radio value={"bdt"}>৳ BDT</Radio>
              <Radio value={"inr"}>₹ INR</Radio>
              <Radio value={"usd"}>$ USD</Radio>
              <Radio value={"eur"}>€ EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
            <Text alignSelf={"center"} fontSize={"small"}>
              Last Updated on {Date().split("G")[0]}
            </Text>

            <Image
              src={coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencysymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>

              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>

              <Badge
                fontSize={"2xl"}
                bgColor={"blackAlpha.900"}
                color={"whiteAlpha.800"}
              >
                {`#${coin.market_cap_rank}`}
              </Badge>
            </Stat>

            <CustomBar
              high={`${currencysymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencysymbol}${coin.market_data.low_24h[[currency]]}`}
            />

            <Box w={"full"} p={"4"}>
              <Item value={coin.market_data.max_supply} title={"Max Supply"} />
              <Item
                value={coin.market_data.circulating_supply}
                title={"Circulating Supply"}
              />
              <Item
                value={`${currencysymbol}${coin.market_data.market_cap[currency]}`}
                title={"Market Capital"}
              />
              <Item
                value={`${currencysymbol}${coin.market_data.ath[currency]}`}
                title={"All Time High"}
              />
              <Item
                value={`${currencysymbol}${coin.market_data.atl[currency]}`}
                title={"All Time Low"}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={"50"} colorScheme="teal" w={"full"} />
    <HStack w={"full"} justifyContent={"space-between"}>
      <Badge children={low} colorScheme="red" />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme="green" />
    </HStack>
  </VStack>
);

export default CoinDetails;
