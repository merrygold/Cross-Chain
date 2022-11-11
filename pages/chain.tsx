import Image from "next/image";
// @ts-nocheck
import { ethers } from "ethers";
import {  useAccount, useNetwork, useSigner } from 'wagmi'
import { Box, Button, Center, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Web3 from "web3";
import axios from "axios";
import ABI from '../pages/src/utils/ABI/polygon.json'

export default function Chain() {
  const { address} = useAccount()
  const { chain } = useNetwork()
  const API = "0KEpH3iOcb7NF49r9hh40AvjYWeFjxfAY15Zf7mzayVEfM9UW1Bt8ZJpcZbV1N2C";

  const ABI_Contract = ABI;
  const goerliAddress = '0xF36C7Aa9435d021a0C4CcB63eDaba1df2EeC4Fb5';
  const bscAddress = '0x35a8d1e76e505e0f4b7be227f19ff0222f443366';
  
  
  const { data: signer } = useSigner()  

  async function sendBNB() {

    const contractCall = new ethers.Contract(bscAddress, ABI_Contract , signer)
    const txn = await contractCall.fund("ethereum-2",goerliAddress,{value: ethers.utils.parseEther("0.03")})
    await txn.wait()
    
  }

  async function sendEth() {

    const contractCall = new ethers.Contract(goerliAddress, ABI_Contract , signer)
    const txn = await contractCall.fund("binance",bscAddress,{value: ethers.utils.parseEther("0.03")})
    await txn.wait()

  }
  








return (
  <>
  <Stack direction={"row"} align={"center"} justify={"center"}>
  <Heading
  fontWeight={600}
  fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
  lineHeight={'110%'}
  >
  Fund Right Now On
  <Text ml={6} as={'span'} color={'#019EF7'}>
     Ethereum & BSC
  </Text>
  </Heading>
  </Stack>
  <Stack p={12} direction={"row"} align={"center"} justify={"space-around"}>
 
  <Center  p={12} py={6}>
    <Box
      maxW={"600px"}
      maxH={"900px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"md"}
      p={6}
      overflow={"hidden"}
      borderRadius={"40px"}
    >
      <Box
        h={"350px"}
        bg={"gray.100"}
        mt={-6}
        mx={-6}
        mb={6}
        pos={"relative"}
      >
        <Box boxSize="lg">
          <Image
            layout="fill"
            src="https://i0.wp.com/coinscreed.com/akoakris/2021/05/Binance-Smart-Chain-BSC.png?resize=1024%2C576&ssl=1"
            alt="Dan Abramov"
          />
        </Box>
      </Box>
      <Stack>
        <Stack direction={"row"} align={"center"} justify={"center"}>
          <Text  fontSize={"2xl"}> <Text color={'red'} as={'span'}>Send 0.05</Text> For TOP Contributer & Claim NFT:</Text>
        </Stack>
        <Button mt={6} onClick={sendBNB} colorScheme='green'>Send 0.03 BNB</Button>
      </Stack>

    </Box>
  </Center>

  
  <Center  p={12} py={6}>
    <Box
      maxW={"600px"}
      maxH={"900px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"md"}
      p={6}
      overflow={"hidden"}
      borderRadius={"40px"}
    >
      <Box
        h={"350px"}
        bg={"gray.100"}
        mt={-6}
        mx={-6}
        mb={6}
        pos={"relative"}
      >
        <Box boxSize="lg">
          <Image
            layout="fill"
            src="https://static.cryptobriefing.com/wp-content/uploads/2021/08/27093646/ethereum-geth-bug-cover-1024x538.png"
            alt="Dan Abramov"
          />
        </Box>
      </Box>
      <Stack>
        <Stack direction={"row"} align={"center"} justify={"center"}>
        <Stack direction={"row"} align={"center"} justify={"center"}>
          <Text  fontSize={"2xl"}> <Text color={'red'} as={'span'}>Send 0.05</Text> For TOP Contributer & Claim NFT:</Text>
        </Stack>
        
        </Stack>

        <Button mt={6} onClick={sendEth} colorScheme='green'>Send 0.03 ETH</Button>
      </Stack>

    </Box>
  </Center>

  </Stack>


  </>
);



}