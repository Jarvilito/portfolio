import React, { Fragment, useState } from "react";
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
  },

  img: {
    width: "100%",
    right: "2%",
  },

  quote: {
    textAlign: "center",
    color: "#f5f5f5",
    letterSpacing: "2px",
  },

  quoteAuthor: {
    textAlign: "center",
    color: "#f5f5f5",
    letterSpacing: "2px",
    fontSize: "1.2em",
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

function Navbar() {
  const classes = useStyles();

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
      link: "https://firebasestorage.googleapis.com/v0/b/jarvis-tech-portfolio.appspot.com/o/Resume.pdf?alt=media&token=129dab87-deb4-453e-bf7d-85927883f392"
    }
  ]);

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

    return <Button className={classes.padding} target="_blank" href={menu.link}>{menu.label}</Button>
  };


  const MenuLink = (props) => {
    const menu = props.menu
    if (menu.link)
      return <Fragment>

        <ListItemIcon>
          <a target="_blank" rel="noopener noreferrer" href={menu.link}><menu.icon fontSize="small" /></a>
        </ListItemIcon>
        <a target="_blank" rel="noopener noreferrer" href={menu.link}><ListItemText primary={menu.label} /></a>

      </Fragment>

    return <Fragment><ScrollIntoView selector={`#${menu.id}`}
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
                        {navMenu.map((menu) => {
                          return (
                            <ScrollIntoView
                              selector={`#${menu.id}`}
                              key={menu.id}
                            >
                              <GetDesktopMenuBtn menu={menu} />
                              {/* <Button className={classes.padding}>
                                {menu.label}
                              </Button>

                              <Button target="_blank" href="http://www.google.com/">Google</Button> */}
                            </ScrollIntoView>
                          );
                        })}
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
            <Grid container alignItems="center" justify="center" spacing={0}>
              <Grid item xs={12} md={6}>
                <Fade bottom delay={1000}>
                  <Paper elevation={0} className={classes.trasparent}>
                    <Typography
                      variant="h5"
                      className={classes.quote}
                      gutterBottom
                    >
                      ❝ Failure is an option here. If things are not failing,
                      you are not innovating enough. ❞
                    </Typography>
                    <Divider variant="middle" className={classes.whiteColor} />
                    <Typography
                      variant="button"
                      display="block"
                      className={classes.quoteAuthor}
                      gutterBottom
                    >
                      - Elon Musk
                    </Typography>
                  </Paper>
                </Fade>
              </Grid>
              <Grid item xs={12} md={6}>
                <img src={laptop2} alt="laptop" className={classes.img}></img>
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
