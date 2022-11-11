
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from './navbar';
import CallToActionWithAnnotation from './main';
import FundingHeader from './total-funding';
import Chain from './chain';
import NftClaim from './nft-claim';
import Contributors from './contributors';
import Footer from './footer';
import FundingNeeded from './funding-needed';
import { useAccount } from 'wagmi';
import { Heading } from '@chakra-ui/react';

const Home: NextPage = () => {
  const { address  ,isConnected} = useAccount()
  return (


    <div className={styles.parent}>
     
    <div className={styles.container}>
      <Head>
        <title>Cross Chain App</title>
      </Head>
      <Navbar />
    </div>
 {isConnected === true ?
  (  <main>
      <CallToActionWithAnnotation />
      <FundingNeeded />
      <FundingHeader/>
      <Chain />
      <Contributors/>
      <NftClaim/>
      <Footer/> 
    </main>
    )
   : (
    <main>  <Heading textAlign={"center"}>Please Connect Your Wallet First</Heading></main>
    )
   }
    </div>
  );
};

export default Home;


