import { Box, Container, CssBaseline } from '@material-ui/core';
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import React from "react";
import AuthForm from './components/AuthForm';
import Footer from "./components/Footer";
import Header from "./components/Header";

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

class User {
  constructor(token = null) {
    this.token = token
  }

  get is_authorized() {
    return this.token != null
  }
}

class ApiManager {
  async register(username, email, password, handleResult) {
    const url = "http://0.0.0.0:8000/api/auth/register/"

    let formData = new FormData();
    formData.append('username', username);
    if(email != null)
      formData.append('email', email);
    formData.append('password', password);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    })

    const json = await response.json()

    handleResult(json)
  }
}

function getUser() {
  return new User(localStorage.getItem('Authorization'))
}

function App() {
  const user = getUser()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={styles.root}>
        <Header user={user} />
        <Container component="main" style={styles.content}>
          <AuthForm apiManager={new ApiManager()} />
        </Container>
        <Box mt="auto">
          <Footer />
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
