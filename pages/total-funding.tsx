// @ts-nocheck
import Image from "next/image";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,

} from "@chakra-ui/react";
import axios from "axios";
import {  useAccount, useNetwork } from 'wagmi'
import { useState } from "react";
import Web3 from "web3";
import polygon from '../pages/polygon.png'
import bsc from '../pages/bsc.png'
import goerli from '../pages/goerli.png'
import ABI from '../pages/src/utils/ABI/polygon.json'
import {
  useSigner
} from "wagmi";``
import { ethers } from "ethers";


export default function FundingHeader() {


const { chain } = useNetwork()
const [funds , setFunds] = useState()
const [fundBalance , setfundBalance] = useState(0)
const [fundOnEth , setFundOnEth] = useState()
const [fundOnBsc , setFundOnBsc] = useState()
const [chainId , setChainId] = useState()
const { address} = useAccount()
const API = "0KEpH3iOcb7NF49r9hh40AvjYWeFjxfAY15Zf7mzayVEfM9UW1Bt8ZJpcZbV1N2C";

const { data: signer } = useSigner()


const ABI_Contract = ABI;
const goerliAddress = '0xF36C7Aa9435d021a0C4CcB63eDaba1df2EeC4Fb5';
const bscAddress = '0x35a8d1e76e505e0f4b7be227f19ff0222f443366';


// ** Wallet Balance of the Current 
async function main() {
  
  const NumbertoHex = Web3.utils.numberToHex(chain.id)

  const balance = {
      method: 'GET',
      url: `https://deep-index.moralis.io/api/v2/${address}/balance`,
      params: {chain: NumbertoHex},
      headers: {accept: 'application/json', 'X-API-Key': API}
  };
  
  axios
  .request(balance)
  .then(async function (response) {
      setChainId(chain.id)
      let fromWeiToNumber =
      response.data.balance !== undefined
      ? Web3.utils.fromWei(String(response.data.balance), "ether")
      : 0;

      if(chainId == "97"){
        const contractCall = new ethers.Contract(bscAddress, ABI_Contract , signer)
        const txn = await contractCall.addressToFunds(address)
        const result = Web3.utils.hexToNumberString(txn)
        const resultParsed = Web3.utils.fromWei(result)
        console.log(resultParsed)
        setfundBalance(resultParsed)
      
        }
        else if (chainId == "5") {
          const contractCall = new ethers.Contract(goerliAddress, ABI_Contract , signer)
        const txn = await contractCall.addressToFunds(address)
        const result = Web3.utils.hexToNumberString(txn)
        const resultParsed = Web3.utils.fromWei(result)
        console.log(resultParsed)
        setfundBalance(resultParsed)
        }
      setFunds(fromWeiToNumber)
  })
  .catch(function (error) {
      console.error(error);
  });

  
}
main()

async function ChainFunds() {

  const providerGoerli = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/-jsSe0TOIS7xTfoYjty2CWsEsNs2G0py");
  const contractCall = new ethers.Contract(goerliAddress, ABI_Contract , providerGoerli)
    const txn = await contractCall.fundsOnCurrentChain()
    const result = Web3.utils.hexToNumberString(txn)
    const resultParsed = Web3.utils.fromWei(result)
    setFundOnEth(resultParsed)

    const providerBSC = new ethers.providers.JsonRpcProvider("https://bsc-testnet.nodereal.io/v1/aeaaa44b68a946e6a36406dfe5d114e3");
    const contract = new ethers.Contract(bscAddress, ABI_Contract , providerBSC)
    const txnBsc = await contract.fundsOnCurrentChain()
    const resultBsc = Web3.utils.hexToNumberString(txnBsc)
    const resultParsedBSC = Web3.utils.fromWei(resultBsc)
    const finalValue = parseFloat(resultParsedBSC).toFixed(4)
    setFundOnBsc(finalValue)
}
ChainFunds()



  return (
<>


    <Center py={6}>
    <Stack direction={"row"} align={"center"} alignItems= {"baseline"} justify={"space-between"}>  
      <Box
        ml={6}
        maxW={"1000px"}
        maxH={"900px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"3xl"}
        rounded={"lg"}
        borderRadius={'45px'}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"350px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <Box boxSize="md">
            <Image
              layout="fill"
              src="https://image.blockchain.news/features/C94898998154A110FBC18190A10CDAC297DB0895381D38FEA173B6A5813FC960.jpg"
              alt="Dan Abramov"
              width={"300px"}
              height={"300px"}
            />
          </Box>
        </Box>
        <Stack>


          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text
              color={"black"}
              textTransform={"uppercase"}
              fontWeight={700}
              fontSize={"lg"}
            >
              Cross-Chain Funding Project
            </Text>
          </Stack>
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Heading
              fontSize={"4xl"}
              fontFamily={"body"}
              color={'#019EF7'}
            >
              VR MetaVerse Project
            </Heading>
          </Stack>

          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"4xl"} fontWeight={700}>Total Fund Raised</Text>
          
          </Stack>
        </Stack>

    <Stack direction={"row"} align={"center"} justify={"center"}>
      <Stack>
      
      <Text borderRadius={'24px'} p={3} backgroundColor='#6b46c1' color='white' fontWeight={600}>Funds on Ethereum: <Text as={'span'} color={'yellow'}>{fundOnEth} Eth</Text></Text>
      </Stack>  
      <Stack>

      <Text borderRadius={'24px'} p={3} backgroundColor='#6b46c1' color='white' fontWeight={600}>Funds on Bsc: <Text as={'span'} color={'yellow'}>{fundOnBsc} BSC</Text></Text>
      </Stack>
    </Stack>

    
        <Stack p={2} m={2} display={"flex"} direction={"row"} alignContent={"center"} align={"center"} justify={"center"}>
        <Text fontSize={"2xl"} >
           Wallet Balance: <Text as={"span"} color="red">{funds}  
        </Text>
        </Text> 
       {chainId == "80001" ?
       (<Stack m={3}> <Image  src= {polygon}  alt="POLYGON"  width="30px" height="30px"/></Stack>) 
      : chainId == "5" ?
       (<Stack m={3}> <Image  src= {goerli}  alt="Goerli"  width="30px" height="30px"/></Stack>)
      :
      (<Stack m={3}> <Image  src= {bsc}  alt="POLYGON"  width="30px" height="30px"/></Stack>)
      } 
      
        </Stack>
  


       
        <Stack p={2} m={2} display={"flex"} direction={"row"} alignContent={"center"} align={"center"} justify={"center"}>
        <Text fontSize={"2xl"} >
           Funded Balance: <Text as={"span"} color="red">
           {fundBalance}
        </Text>
        </Text> 
       {chainId == "80001" ?
       (<Stack m={3}> <Image  src= {polygon}  alt="POLYGON"  width="30px" height="30px"/></Stack>) 
      : chainId == "5" ?
       (<Stack m={3}> <Image  src= {goerli}  alt="Goerli"  width="30px" height="30px"/></Stack>)
      :
      (<Stack m={3}> <Image  src= {bsc}  alt="POLYGON"  width="30px" height="30px"/></Stack>)
      } 
      
        </Stack>



        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>By: WICK</Text>
            <Text color={"gray.500"}>Ending Date: Feb 08, 2023</Text>
          </Stack>
        </Stack>
      </Box>
      </Stack>
    </Center>
</>

  );
}
