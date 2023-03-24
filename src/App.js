import { Box, Container, CssBaseline } from '@material-ui/core';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import AuthForm from './components/AuthForm';
import Footer from "./components/Footer";
import Header from "./components/Header";

// Define the default theme for the app
const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // Felix the cat's blue color
    },
    secondary: {
      main: "#ff5722", // A secondary color
    },
    text: {
      primary: "#333", // Primary text color
      secondary: "#777", // Secondary text color
    },
    background: {
      default: "#f5f5f5", // Default background color
    },
  },
  typography: {
    fontFamily: ["Arial", "sans-serif"].join(","),
    fontSize: 16, // Default font size
    h1: {
      fontWeight: "bold",
      fontSize: "3rem",
    },
    h2: {
      fontWeight: "bold",
      fontSize: "2rem",
    },
    h3: {
      fontWeight: "bold",
      fontSize: "1.5rem",
    },
    h4: {
      fontWeight: "bold",
      fontSize: "1.2rem",
    },
    subtitle1: {
      fontWeight: "bold",
    },
  },
  shape: {
    borderRadius: 8, // Default border radius
  },
});

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: '1 0 auto',
  },
};

// App component that incorporates Header, Content, and Footer components
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={styles.root}>
        <Header />
        <Container component="main" style={styles.content}>
          <AuthForm />
        </Container>
        <Box mt="auto">
          <Footer />
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
