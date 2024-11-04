import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import btcPic from "../assets/btc.png";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Box w={"full"} h={"85vh"} bgColor={"blackAlpha.900"}>
      <motion.div style={{
        height:"80vh"
      }}
      animate={{
        translateY:"20px"
      }}
      transition={{
        duration:"1s",
        repeat:"infinity",
        repeatType:"reverse"
      }}
      >
        <Image w={"full"} h={"full"} objectFit={"contain"} src={btcPic} />
      </motion.div>

      <Text
        mt={"-3.5rem"}
        fontSize={"5xl"}
        color={"whiteAlpha.700"}
        fontWeight={"thin"}
        textAlign={"center"}
      >
        Crypto-Log
      </Text>
    </Box>
  );
};

export default Home;
