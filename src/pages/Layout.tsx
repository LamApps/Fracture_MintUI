import { Outlet } from 'react-router-dom';

import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Hidden from '@material-ui/core/Hidden';

import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import { useWallet } from "@solana/wallet-adapter-react";

import background from "../assets/img/background.jpg";
import logo from "../assets/img/FractureWhite_text.png";

import { Icon } from '@iconify/react';

const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'hidden',
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
    textAlignCenter : {
        textAlign: 'center',
    },
    textAlignRight : {
        textAlign: 'right',
    },
    logo: {
        width: '150px',
    },
    header: {
        padding: '40px 40px 0 40px',
    }
  }));

  const ConnectButton = styled(WalletDialogButton)`
    margin-bottom: 10px;
    margin-left: 20px;
    height: 50px;
    background: linear-gradient(180deg, #604ae5 0%, #813eee 100%);
    color: white;
    font-size: 14px;
    font-weight: bold;
    `;

const Layout = () => {
    const classes = useStyles();
    const wallet = useWallet();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container className={classes.header}>
                <Grid 
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                >
                    <Grid item xs={4}>
                        <Hidden xsDown>
                            <Link href="#" variant="body1" color="inherit">
                                CONTACT
                            </Link>
                            <Link href="#" variant="body1" color="inherit" style={{marginLeft: '20px'}}>
                                INFORMATION
                            </Link>
                        </Hidden>
                    </Grid>
                    <Grid item xs={4} className={classes.textAlignCenter}>
                        <img src={logo} className={classes.logo}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Hidden xsDown>
                            <div className={classes.textAlignRight}>
                                <Link href="#" underline="none" style={{marginRight: '20px'}}><Icon icon="akar-icons:twitter-fill" color="lightgray" width={20}/></Link>
                                <Link href="#" underline="none"><Icon icon="akar-icons:discord-fill" color="lightgray" width={20}/></Link>
                                {!wallet.connected && <ConnectButton>Connect</ConnectButton>}
                            </div>
                        </Hidden>
                    </Grid>
                </Grid>
                <Outlet />
            </Container>
        </div>
    )
}
export default Layout;
