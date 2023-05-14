import { Box, Container, CssBaseline } from '@material-ui/core';
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { getUser } from "./utils";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#ff5722",
    },
    text: {
      primary: "#333",
      secondary: "#777",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: ["Arial", "sans-serif"].join(","),
    fontSize: 16,
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
    borderRadius: 8,
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


let router = createBrowserRouter([
  {
    path: "/",
    element: <Content />,
  },
  {
    path: "/login", 
    element: <AuthForm isRegister={true} />,
  },
  {
    path: "/register",
    element: <AuthForm isRegister={false} />,
  },
]);
  
function App() {
  const user = getUser()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={styles.root}>
        <Header user={user} />
        <Container component="main" style={styles.content}>
          <RouterProvider router={router} />
        </Container>
        <Box mt="auto">
          <Footer />
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
