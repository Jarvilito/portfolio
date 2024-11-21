import React, { Fragment, useState, useEffect } from "react";
import cover5 from "../img/cover5.jpeg";
import laptop2 from "../img/laptop2.png";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Grid,
  Paper,
  Divider,
  Hidden,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Link,
} from "@material-ui/core/";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import CodeIcon from "@material-ui/icons/Code";
import EventNoteTwoToneIcon from "@material-ui/icons/EventNoteTwoTone";
import SportsEsportsTwoToneIcon from "@material-ui/icons/SportsEsportsTwoTone";
import PhotoLibraryTwoToneIcon from "@material-ui/icons/PhotoLibraryTwoTone";
import Fade from "react-reveal/Fade";
import Swing from "react-reveal/Swing";
import ScrollIntoView from "react-scroll-into-view";
import AboutMe from "./AboutMe";
import Skills from "./Skills";
import { Timeline } from "./Timeline";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import { Hobby } from "./Hobby";
import { Footer } from "./Footer";
import Login from "./auth/Login";
import CommentIcon from "@material-ui/icons/Comment";
import Comment from "./comment/Comment";
// import { Footer } from "./Footer";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../model/Firebase.model";
import Axios from "axios";


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  appBar: {
    background: "transparent",
  },

  trasparent: {
    background: "transparent",
  },
  

  menuWidth: {
    minWidth: "250px",
  },

  toolBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
  },

  leftMenu: {
    display: "flex",
    aligItems: "center",
  },

  iconButton: {
    fontSize: "2em",
    // color: "#261066",
  },

  title: {
    fontSize: "1.7em",
    paddingTop: "10px",
  },

  padding: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    color: "#f0efed",
    fontWeight: "600",
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
      margin: theme.spacing(1),
    }
  },

  img: {
    width: "100%",
    right: "2%",
  },

  quote: {
    textAlign: "center",
    color: "#f5f5f5",
    letterSpacing: "2px",
    fontWeight: 'bolder',
  },

  quoteAuthor: {
    textAlign: "center",
    color: "#f5f5f5",
    letterSpacing: "2px",
    fontSize: "1.5em",
    fontWeight: 'bolder',
  },

  whiteColor: {
    backgroundColor: "white",
  },

  headerSpacing: {
    margin: "25px 10px",
  },

  container: {
    display: "flex",
  },
}));

const initialQuote = {
  quote: 'Failure is an option here. If things are not failing, you are not innovating enough.',
  author: 'Elon Musk',
}
function Navbar() {
  const imagesListRef = ref(storage, "pdf/");


  const classes = useStyles();

  const [resumeUrl, setResumeUrl] = useState(null);

  const [quote, setQuote] = useState(initialQuote)
  

  const [anchorEl, setAnchorEl] = useState(null);

  const [navMenu, setNavMenu] = useState([
    {
      icon: CodeIcon,
      label: "About Me",
      id: "aboutMe",
    },
    {
      icon: ClearAllIcon,
      label: "Skills",
      id: "skills",
    },
    {
      icon: EventNoteTwoToneIcon,
      label: "Timeline",
      id: "timeline",
    },
    {
      icon: SportsEsportsTwoToneIcon,
      label: "Hobby",
      id: "hobby",
    },
    {
      icon: CommentIcon,
      label: "Comments",
      id: "comments",
    },
    {
      icon: AssignmentIcon,
      label: "Resume",
      id: "resume",
      link: true,
    }
  ]);

  const getQuote = async () => {

    try {
      const { data } = await Axios.get('https://quoteslate.vercel.app/api/quotes/random?tags=life,wisdom,motivation');
      setQuote({
        quote: data.quote,
        author: data.author,
      })
      
    }

    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getQuote();
    listAll(imagesListRef).then((response) => {
      getDownloadURL(response.items[0]).then((url) => {
        setResumeUrl(url);
      })
    });
  }, []);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const GetDesktopMenuBtn = (props) => {
    const menu = props.menu
    if (menu.id !== 'resume') {
      return <Button className={classes.padding}>
        {menu.label}
      </Button>
    }

    return <Button style={{display: 'flex'}} className={classes.padding} target="_blank" href={resumeUrl}>{menu.label}</Button>
  };

  const MenuLink = (props) => {
    const menu = props.menu
    if (menu.link)
        return <Fragment>

          <ListItemIcon>
            <a target="_blank" rel="noopener noreferrer" href={resumeUrl}><menu.icon fontSize="small" /></a>
          </ListItemIcon>
          <a target="_blank" rel="noopener noreferrer" href={resumeUrl}><ListItemText primary={menu.label} /></a>

      </Fragment>

    return <Fragment>
    <ScrollIntoView selector={`#${menu.id}`}
      onClick={handleClose}>
      <ListItemIcon>
        <menu.icon fontSize="small" />
      </ListItemIcon>
    </ScrollIntoView>
      <ScrollIntoView
        selector={`#${menu.id}`}
        onClick={handleClose}
      >
        <ListItemText primary={menu.label} />
      </ScrollIntoView></Fragment>

  }

  const renderMenus = () => {
    return navMenu.map( menu => {
        if(menu.id === 'resume') return (<GetDesktopMenuBtn key="{menu.id}" menu={menu} />);
        return (
          
          <ScrollIntoView
            style={{ display: 'flex'}}
            selector={`#${menu.id}`}
            key={menu.id}
          >
            <GetDesktopMenuBtn menu={menu} />
          </ScrollIntoView>
        );
    })
  }

  return (
    <>
      <div className={classes.root}>
        <div className="hero-image">
          <Container maxWidth="lg">
            <Grid
              container
              alignItems="center"
              className={classes.headerSpacing}
            >
              <Grid item xs={12}>
                <AppBar
                  position="static"
                  className={classes.appBar}
                  elevation={0}
                >
                  <Toolbar className={classes.toolBar}>
                    <div className={classes.leftMenu}>
                      <IconButton color="inherit" aria-label="menu">
                        <DeveloperModeIcon className={classes.iconButton} />
                      </IconButton>

                      <span className={classes.title}>Jarvis</span>
                    </div>
                    <Hidden smDown>
                      <div className={classes.container}>
                        {renderMenus()}
                        <Login />
                      </div>
                    </Hidden>
                    <Hidden mdUp>
                      <IconButton
                        color="inherit"
                        aria-label="menu"
                        onClick={handleClick}
                      >
                        <MoreVertIcon fontSize="large" />
                      </IconButton>
                      <Menu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        className={classes.menuWidth}
                      >
                        {navMenu.map((menu) => {
                          return (
                            <MenuItem key={menu.id}>
                              <MenuLink menu={menu} />
                            </MenuItem>
                          );
                        })}
                        <Divider variant="middle" />
                        <MenuItem onClick={handleClose}>
                          <Login />
                        </MenuItem>
                      </Menu>
                    </Hidden>
                  </Toolbar>
                </AppBar>
              </Grid>
            </Grid>
            <Grid style={{ minHeight: 'calc(100vh - 130px', marginTop: '10rem'}} container justify="center" spacing={0}>
              <Grid item xs={12} md={6}>
                <Fade bottom delay={1000}>
                  <Paper elevation={0} className={`${classes.trasparent} banner-quote`}>
                    <Typography
                      variant="h5"
                      className={classes.quote}
                      gutterBottom
                    >
                      ❝ {quote.quote} ❞
                    </Typography>
                    <Divider variant="middle" className={classes.whiteColor} />
                    <Typography
                      variant="button"
                      display="block"
                      className={classes.quoteAuthor}
                      gutterBottom
                    >
                      - {quote.author}
                    </Typography>
                  </Paper>
                </Fade>
              </Grid>
            </Grid>
            <div>
              <AboutMe id="aboutMe"/>
              <Skills />
              <Timeline />
              <Hobby />
              <Comment />
            </div>
          </Container>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}

export default Navbar;
