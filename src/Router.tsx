import { Routes, Route, BrowserRouter } from "react-router-dom";

import * as anchor from "@project-serum/anchor";
import { DEFAULT_TIMEOUT } from "./connection";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";


// Layouts
import Layout from './pages/Layout';
import Home from "./pages/Home";

const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
  try {
    return new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID!);
  } catch (e) {
    console.log("Failed to construct CandyMachineId", e);
    return undefined;
  }
};
let error: string | undefined = undefined;

if (process.env.REACT_APP_SOLANA_NETWORK === undefined) {
  error =
    "Your REACT_APP_SOLANA_NETWORK value in the .env file doesn't look right! The options are devnet and mainnet-beta!";
} else if (process.env.REACT_APP_SOLANA_RPC_HOST === undefined) {
  error =
    "Your REACT_APP_SOLANA_RPC_HOST value in the .env file doesn't look right! Make sure you enter it in as a plain-text url (i.e., https://metaplex.devnet.rpcpool.com/)";
}
const candyMachineId = getCandyMachineId();

const network = (process.env.REACT_APP_SOLANA_NETWORK ??
  "devnet") as WalletAdapterNetwork;

const rpcHost =
  process.env.REACT_APP_SOLANA_RPC_HOST ?? anchor.web3.clusterApiUrl("devnet");
const connection = new anchor.web3.Connection(rpcHost);


const AppRouter = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home
              candyMachineId={candyMachineId}
              connection={connection}
              txTimeout={DEFAULT_TIMEOUT}
              rpcHost={rpcHost}
              network={network}
              error={error}
            />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;
