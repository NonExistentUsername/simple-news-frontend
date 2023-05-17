import { Box, Container, CssBaseline } from '@material-ui/core';
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Article, articleLoader } from './components/Article';
import AuthForm from "./components/AuthForm";
import ComingSoon from './components/ComingSoon';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loader from './components/Loader';
import { MyNews, myNewsLoader } from './components/MyNews';
import News from "./components/News";
import { Profile, profileLoader } from './components/Profile';
import { getUser } from "./utils.js";

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
  }
};


let router = createBrowserRouter([
  {
    path: "/",
    element: <News />,
  },
  {
    path: "/login", 
    element: <AuthForm isRegister={true} />,
  },
  {
    path: "/register",
    element: <AuthForm isRegister={false} />,
  },
  {
    path: "/article/:id",
    element: <Article />,
    loader: articleLoader,
  },
  {
    path: "/profile",
    element: <Profile />,
    loader: profileLoader,
  },
  {
    path: "/settings",
    element: <ComingSoon />,
  },
  {
    path: "/my-news",
    element: <MyNews />,
    loader: myNewsLoader,
  }
]);
  
function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    getUser().then((user) => {
      setUser(user);
    });
  }, []);

  if(user === null) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={styles.root}>
          <Container component="main">
            <Loader />
          </Container>  
        </div>
      </ThemeProvider>
    )
  }


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
