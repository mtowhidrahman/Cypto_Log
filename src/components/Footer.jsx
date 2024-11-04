import { Avatar, Box, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import avatarSrc from "../assets/reactLogo.png"

const Footer = () => {
  return (
    <Box
      bgColor={"blackAlpha.600"}
      color={"whiteAlpha.700"}
      minH={"48"}
      px={"16"}
      py={["16", "8"]}
    >
      <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
            This Website is made for keeping track of current Cryptocurrencies
            and their rate worldwide
          </Text>
        </VStack>

        <VStack>
          <Avatar boxSize={"28"} mt={["4", "0"]} src={avatarSrc} />
          <Text textAlign={"center"}>Made With React</Text>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;

// import { Avatar, Box, Stack, Text, VStack } from "@chakra-ui/react";
// import React from "react";

// const Footer = () => {
//   return (
//     <Box
//       minH={"48vh"}
//       bgColor={"blackAlpha.800"}
//       color={"whiteAlpha.700"}
//       px={"16"}
//       py={["16", "8"]}
//     >
//       <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
//         <VStack w={"full"} alignItems={["center", "flex-start"]}>
//           <Text fontWeight={"bold"}>About Us</Text>
//           <Text
//             fontSize={"sm"}
//             letterSpacing={"wider"}
//             textAlign={["center", "left"]}
//           >
//             This Website is made for keeping track of current Cryptocurrencies
//             and their rate worldwide
//           </Text>
//         </VStack>

//         <VStack>
//           <Avatar boxSize={"25"} mt={["4", "0"]} src={""}>
//             <Text> Made With React </Text>
//           </Avatar>
//         </VStack>
//       </Stack>
//     </Box>
//   );
// };

// export default Footer;
