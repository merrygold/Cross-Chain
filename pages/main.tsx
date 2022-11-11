// @ts-nocheck

import Head from 'next/head';
import {
  Box,
  Heading,
  Text,
  Stack,
} from '@chakra-ui/react';

import Image from 'next/image'
import axelar from '../pages/axelar.png'

export default function CallToActionWithAnnotation() {
  return (
    <>
     
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
            display={'flex'}
            alignContent={"baseline"}
            // alignItems={"baseline"}
            alignItems={"center"}
            justifyContent={"space-around"}

            >


            
            <Text as={'span'} color={'#019EF7'}>
            <Text color={"black"}>Donate</Text>   From Any Chain
            </Text>
            <Image
              src= {axelar}
              alt="AXELAR" 
              width="400px"
              height="230px"
              />
          </Heading>
    </>
  );
}
