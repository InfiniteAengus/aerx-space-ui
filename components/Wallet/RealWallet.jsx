import React from 'react'
import {Box, Center, Text, Flex,Image} from '@chakra-ui/react'


function RealWallet() {
  return (
    <Box w="257.56px" h="739.8px" bgColor="#1f1f1f" position="absolute" left="" top="0">
         <Center>
          <Box
            w="21.92px"
            bgColor="rgba(255, 255, 255, 0.3);"
            height="2px"
            mt="8.22px"
            borderRadius="6.85px"
          ></Box>
        </Center>
        <Center>
          <Box
            w="21.92px"
            bgColor="rgba(255, 255, 255, 0.3);"
            height="2px"
            mt="2.74px"
            borderRadius="6.85px"
            mb="19.18px"
          ></Box>
        </Center>

        <Center mb="10.96px">
            <Text fontFamily="Poppins" color="#ffffff" fontWeight="700" fontSize="16.44px" lineHeight="24.66px">Wallet</Text>
        </Center>

        <Text fontWeight="400" fontSize="9.59px" opacity="0.3" fontFamily="Poppins" mb="5.48px" color="white" textAlign="center">Total Balance</Text>

        <Center mb="16.44px" 
        fontWeight='600'
        >
            <Flex gap="5.48px">
            <Text fontFamily="Poppins" lineHeight="100%" fontSize="21.92px" color="#ffffff" letterSpacing="-2%" >12,786</Text>
            <Text h="21.92px" w="21.92px" fontFamily="Open Sans" lineHeight="100%" color='#FFFFFF' fontSize="24.66px" mt="-2px"> æ </Text>
            </Flex>
        </Center>
        

        <Center borderRadius="34.935px" mb="21.92px" bgColor="#FFFFFF0D;
"  py="5.48px" px="10.96px" mx="82.2px" w="93.16px">
        <Flex fontFamily="Poppins"  fontSize="10.96px" fontWeight="500" >
            <Text color="white">4,312</Text>
            <Text color="#FFFFFF80;
">.16 NEAR</Text>
        </Flex>
        </Center>

        <Flex mb="21.92px" gap="5.48px" mx="54.8px">
            <Box borderRadius="10.275px" py="9.9325px" px="9.59px" bgColor="#FFFFFF0D;">  
            <Image src={"../resources/Download1.png"} w="16.44px" h="16.44px" />
            </Box>
            <Box borderRadius="10.275px" py="9.9325px" px="9.59px" bgColor="#FFFFFF0D;">
            <Image src={"../resources/Upload1.png"} w="16.44px" h="16.44px"  />
            </Box>
            <Box borderRadius="10.275px" py="9.9325px" px="9.59px" bgColor="#FFFFFF0D;">
            <Image src={"../resources/Frame 5557.png"} w="16.44px" h="16.44px"  />
            </Box>
            <Box borderRadius="10.275px" py="9.9325px" px="9.59px" bgColor="#FFFFFF0D;">
            <Image src={"../resources/plant 1.png"} w="16.44px" h="16.44px"  />
            </Box>
        </Flex>
        {/* end */}

    </Box>
  )
}

export default RealWallet