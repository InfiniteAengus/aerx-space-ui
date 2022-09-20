import React from "react";
import { Box, Flex, Image, Text, Button, Heading, Center } from "@chakra-ui/react";
import { nearStore } from "../../store/near";
import { produceWithPatches } from "immer";

// type Props = {}

const Circle = (props) => {
  const nearState = nearStore((state) => state);

  let display = props.circle ? "block" : "none"
  let index = props.circle ? 1 : "none"
  let width = props.circle ? 655 : "none"


  


 

  return (
    <Box 
    w={width}
    bg="#000000B2;
    "
    // opacity="15%"
    zIndex={index}
    
    >
    <Box
 

      w="252.905px"
      h="467.17px"
      position="fixed"
      borderRadius="20px"
      bgColor="#191919"
      top="108.915"
      left="102.75px"
      px="auto"
      // zIndex="1"
      className="circleModal"
      display={display}
     
    >
      <Flex position="absolute" flexDirection="column" gap="20.42px" ml="19.18px" mt="16.44px" zIndex='2' onDoubleClick={(e) => props.onDoubleClick(e)}>
        {/* <Box
          width="27.4px"
          height="27.4px"
          border="2px solid"
          borderColor="white"
          padding="2px"
          borderRadius="100%"
        >
          <Image
            src={"../resources/1.png"}
            position="relative"
            zIndex="2"
            top="5.48px"
            left="6.85px"
            w="6.85px"
            h="10.96px"
            boxShadow="xl"
          />

          <Image
            src={"../resources/Ellipse 7.png"}
            position="relative"
            top="-10.96px"
          />
        </Box>
        <Box>
          <Image
           width="27.4px"
           height="27.4px"
            padding="2px"
            border="2px solid"
            borderColor="white"
            borderRadius="100%"
            src={"../resources/Ellipse 2.png"}
          />
        </Box> */}
          {/* <Image src={'../resources/Group 5450.png'}  w="13.37805px" h="21.92px" />
 
       <Image src={'../resources/Send2.svg'}    w="21.92px" h="21.92px" />
       <Image src={'../resources/Tempo.png'}    w="21.92px" h="21.92px" /> */}
      </Flex>

      <Flex position="absolute" flexDirection="column" gap="16.44px" ml="248.47005px" mt="46.54px" alignItems="center" zIndex='2'>
       {/* <Image src={'../resources/Group 5450.png'}  w="13.37805px" h="21.92px" />
       <Image src={'../resources/Frame 13920.png'}  w="21.92px" h="21.92px" />
       <Image src={'../resources/Send.svg'}    w="21.92px" h="21.92px" />
       <Image src={'../resources/Tempo.png'}    w="21.92px" h="21.92px" /> */}
         <Image src={'../resources/Group 5450.png'}  w="13.37805px" h="21.92px" />
 
 <Image src={'../resources/Send2.svg'}    w="21.92px" h="21.92px" />
 <Image src={'../resources/Tempo.png'}    w="21.92px" h="21.92px" />
      </Flex>


      <Image
           onClick={(e) => props.remove(e)}

        src={"../resources/Frame 139.png"}
        position="absolute"
        w="16.44px"
        h="16.44px"
        top="15.07685px"
        right="10.96px"
        zIndex="2"
        cursor="pointer"
        mr="2%"
      />

      <Box
        bgImage={`url('${nearState.profile.profileImg}')`}
        bgRepeat="no-repeat"
        bgSize="282.905px 297.29px"
          bgColor="#191919"
        // bgGradient='linear(to-b black.100)'
        opacity="0.8"
        
        borderTopRadius="13.7px"
        w="282.905px"
        height="297.29px"
        top="0"
        position="absolute"
        zIndex=""
        className="modal"
      ></Box>
<Center>

      <Flex
        flexDirection="column"
        alignItems="center"
        position="absolute"
        top="253.45px"
      >
        <Heading
          fontSize="21.92px"
          color="#FFFFFF"
          fontFamily="Poppins"
          fontWeight="700"
          fontStyle="normal"
          lineHeight="21.92px"
          mb="4.795px"
          textTransform="capitalize"

        >
          {nearState.profile.fullName}
        </Heading>
        <Text
          fontSize="12.33px"
          fontFamily="Poppins"
          fontStyle="italic"
          color="#FFFFFFB2"
          fontWeight="400px"
          letterSpacing="-0.02em"
          mb="9.59px"

        >
          {nearState.profile.username}
        </Text>
        <Flex mb="14px">
          <Image
            src={"../resources/Ellipse 702.png"}
            marginRight={2}
            w="10.96px"
            h="10.96px"
          />
          <Text
            color="#FFFFFF80"
            fontFamily="Poppins"
            fontWeight="500"
            fontSize="9.59px"
          >
            Aura: 2k
          </Text>
        </Flex>
        <Flex
          justifyItems="center"
          alignItems="center"
          gap="5.48px"
          mb="8.59px"
        >
          <Text
            px="6.85px"
            py="4.11px"
            borderRadius="13.7px"
            fontFamily="Poppins"
            fontWeight="400"
            fontSize="10.96px"
            color="#ffffff"
            bgColor="rgba(255, 255, 255, 0.1)"
          >
            #crypto
          </Text>
          <Text
            px="6.85px"
            py="4.11px"
            borderRadius="13.7px"
            fontFamily="Poppins"
            fontWeight="400"
            fontSize="10.96px"
            color="#ffffff"
            bgColor="rgba(255, 255, 255, 0.1)"
          >
            #nfts
          </Text>
          <Text
            px="6.85px"
            py="4.11px"
            borderRadius="13.7px"
            fontFamily="Poppins"
            fontWeight="400"
            fontSize="10.96px"
            color="#ffffff"
            bgColor="rgba(255, 255, 255, 0.1)"
          >
            #future
          </Text>
          <Text
            px="6.85px"
            py="4.11px"
            borderRadius="13.7px"
            fontFamily="Poppins"
            fontWeight="400"
            fontSize="10.96px"
            color="#ffffff"
            bgColor="rgba(255, 255, 255, 0.1)"
          >
            #Aerx
          </Text>
        </Flex>
        <Text
          fontFamily="Poppins"
          fontWeight="274"
          color="#ffffff"
          textAlign="center"
          px="13.7px"
          lineHeight="15.728px"
          opacity="0.7"
          mb="16.495px"
          fontSize="10.96px"
        >
        {nearState.profile.aboutMe}
        </Text>
        <Button
          py="17.125px"
          px="25.345px"
          bgColor="#B882E1"
          borderRadius="6.85px"
          height="32.88px"
        >
          <Image
            src={"../resources/Frame 14044.png"}
            mr="5.48px"
            w="21.92px"
            h="21.92px"
          />{" "}
          <Text
            fontFamily="Poppins"
            fontWeight="600"
            fontSize="10.96px"
            color="#ffffff"
            letterSpacing="-0.02px"
            lineHeight="100%"
          >
            Start
          </Text>
        </Button>
      </Flex>
      </ Center>
    </Box>

    </Box>
  );
};

export default Circle;
