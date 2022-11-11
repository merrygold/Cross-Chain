import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    Icon,
    IconProps,
  } from '@chakra-ui/react';
import Image from 'next/image';
import polygon from '../pages/polygon.png'
import bsc from '../pages/bsc.png'
import goerli from '../pages/goerli.png'
import ercImg from '../pages/erc.png'
  
  export default function FundingNeeded() {
    return (
     
        <Stack
          textAlign={'center'}
          align={'left'}
         >
          <Heading
            fontWeight={600}
            fontSize={'3xl'}
            lineHeight={'110%'}>
            Total Funding Needed
          </Heading>


     <Stack display={"flex"} direction={"row"} alignContent={"center"} align={"center"} justify={"center"}>
          
     

            <Heading marginLeft={3} as={'span'} color={'#019EF7'}>
              0.2
            </Heading>
            <Stack m={3}> <Image  src= {goerli}  alt="Greli"  width="60px" height="60px"/></Stack>
        
        <Text  color={'black'}>OR</Text>
        
            <Heading marginLeft={3} as={'span'} color={'#019EF7'}>
               0.2
            </Heading>
            <Stack m={3}> <Image  src= {bsc}  alt="BSC"  width="50px" height="50px"/></Stack>
            </Stack>
       
          
    </Stack>
   
    
    );
  }
  
 