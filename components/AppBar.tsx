import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

export default function DenseAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: "#f5f5f5" }} >
                <Toolbar variant="dense">
                    <Image
                        src="/havelsan-dikey-logo.png"
                        width={100}
                        height={70}
                        alt='logo'
                    />
                    <Typography variant="h6" color="black" component="div" sx={{ textAlign: "center", alignItems: "center" }}>
                        SCRUM-AI
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}