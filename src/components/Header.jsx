import { HStack, Button, VStack, Text,  } from "@chakra-ui/react";
import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <HStack p={"4"} shadow={"base"} bgColor={"blackAlpha.600"} >
      <Button px={'3'} color={'white'} variant={'unstyled'}>
        <Link to="/">Home</Link>
      </Button>
      <Button px={'3'} color={'white'} variant={'unstyled'}>
        <Link to="/exchanges">Exchanges</Link>
      </Button>
      <Button px={'3'} color={'white'} variant={'unstyled'}>
        <Link to="/coins">Coins</Link>
      </Button>
    </HStack>
  );
};

export default Header;
