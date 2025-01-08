'use client'
import DenseAppBar from "@/components/AppBar";
import ChatInterface from "@/components/ChatInterface";
import { AppBar, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Replace with your desired primary color
    },
  },
})

export default function Home() {

  return (
    <ThemeProvider theme={theme}>
      <DenseAppBar />
      <ChatInterface />
    </ThemeProvider>
  )
}
