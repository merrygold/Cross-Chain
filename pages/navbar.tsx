

import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from '../styles/Home.module.css';


export default function Nav() {

  return (
    <>
       <div className= {styles.connect}> <ConnectButton /></div>   
    </>
  );
}