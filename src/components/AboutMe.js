import React, { useState, useEffect} from "react";
import { formatDistance } from "date-fns";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Avatar,
  IconButton,
  Divider,
  Container,
  Tooltip,
} from "@material-ui/core/";
import Fade from "react-reveal/Fade";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "../model/Firebase.model";


const useStyles = makeStyles((theme) => ({
  root: {
    // height: "100vh",
    // maxHeight: "350px",
    paddingTop: '2rem',
    marginBottom: "150px",
  },
  title: {
    fontSize: "40px",
    margin: "20px",
    letterSpacing: "5px",
  },


  content: {
    fontSize: "18px",
    margin: '30px 0',
  },
  padding: {
    padding: "25px",
  },
  avatar: {
    display: "block",
    margin: "0 auto",
    marginTop: "20px",
    [theme.breakpoints.down('sm')]: {
      height: '250px'
    },

    [theme.breakpoints.up('md')]: {
      height: '500px'
    },

    width: "70%",
  },

  noBorder: {
    boxShadow: "none",
    textAlign: "center",
  },
  iconSpace: {
    // padding: "10px 0px",
  },

  iconClass: {
    fontSize: "6rem",
    [theme.breakpoints.down('sm')]: {
      fontSize: "5rem",
    }
  },
  footer: {
    fontSize: "2rem",
    letterSpacing: "3px",
  },

  paddingBottom: {
    padding: "15px 0",
  },
  contact: {
    fontSize: "20px",
    fontWeight: "500",
  },

  email: {
    fontSize: "20px",
    fontWeight: "500",
    cursor: "pointer",
  },

  centerText: {
    textAlign: "center",
  },

  coverPhoto: {

    minWidth: "250px",
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      height: '350px'
    },

    [theme.breakpoints.up('md')]: {
      height: '550px'
    },
  },

  container: {
    borderRadius: '15px',
    
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('md')]: {
      marginLeft: '5rem',
    }
  },

  containerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontSize: '2rem',
    letterSpacing: '3px',
    margin: '20px 0',
  },


  paddingTop: {
    paddingTop: '1rem',
    paddingBottom: '1rem',
    marginLeft: '-12px',
    marginRight: '-12px',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
    }
  }


}));

function AboutMe() {
  const imagesListRef = ref(storage, "profile/");
  const [profileDesktop, setProfileDesktop] = useState(null);
  const [profileMobile, setProfileMobile] = useState(null);

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        // Use fullPath to get the storage path
        const pathName = item.fullPath;

        // Determine if the path contains "desktop" or "mobile"
        if (pathName.includes("desktop")) {
          getDownloadURL(item).then((url) => {
            setProfileDesktop(url); // Set the URL for desktop
          });
        } else if (pathName.includes("mobile")) {
          getDownloadURL(item).then((url) => {
            setProfileMobile(url); // Set the URL for mobile
          });
        }
      });
    });
  }, []);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [icons] = useState([
    {
      label: "Facebook",
      materialIcon: FacebookIcon,
      color: "#1976d2",
      icon: "fab fa-facebook-square",
      link: "https://www.facebook.com/jarvislp",
    },
    {
      label: "Instagram",
      color: "#e91e63",
      materialIcon: InstagramIcon,
      icon: "fab fa-instagram-square",
      link: "https://www.instagram.com/jarvispalad/?hl=en",
    },
    {
      label: "LinkedIn",
      color: "#1976d2",
      materialIcon: LinkedInIcon,
      link: "https://www.linkedin.com/in/jarvis-palad-632595171/",
    },
  ]);

  const yearOfExp = formatDistance(new Date(), new Date(2017, 2, 8));

  const mobileYearofExp = formatDistance(new Date(), new Date(2019, 7, 1));

  const [aboutMe] = useState({
    header: "About Me",
    description: `Hi, I am Jarvis Lorenz De Villa Palad, web / mobile app developer, born in Philippines. Living in Mandaluyong City. With ${yearOfExp} experience on web development, and ${mobileYearofExp} experience on cross platform development. Welcome to my portfolio. Keep scrolling to know more about me`,
    footer: "Connect with me",
  });
  return (
    <div className={classes.root} id="aboutMe">

      <Container maxWidth="lg" className="about-me">
        <Grid container justify="center">
          <Grid item sm={12} md={5} className="cover-photo--desktop">
            <Avatar alt="Jarvis Palad Profile" src={profileDesktop} className={`${classes.coverPhoto}`} variant="rounded" />
          </Grid>

          <Grid sm={12} md={7} item>
            <Fade bottom>
              <div className={classes.container}>
                <h1 className={classes.containerTitle}>
                <Avatar alt="Jarvis Palad" src={profileMobile} className="cover-photo cover-photo--mobile"/>
                  About me
                </h1>
                <Divider />
                <Typography

                  variant="body1"
                  display="block"
                  color="textPrimary"
                  component="p"
                  className={`transparent ${classes.content}`}
                  gutterBottom
                >
                  {aboutMe.description}
                </Typography>

                <Typography
                  className={classes.footer}
                  gutterBottom

                >
                  {aboutMe.footer}
                </Typography>

                <Divider />

                <Fade left>
                  <Grid container spacing={3} className={`${classes.paddingTop}`}>
                    {icons.map((icon) => {
                      return (
                        <Tooltip
                          key={icon.label}
                          title={icon.label}
                          aria-label="social media"
                          arrow
                        >
                          <IconButton href={icon.link} target="_blank" >
                            <icon.materialIcon
                              className={`${classes.iconSpace} ${classes.iconClass}`}
                              style={{ color: icon.color }}
                            />
                          </IconButton>
                        </Tooltip>
                      );
                    })}
                  </Grid>
                  <Tooltip
                    title="Send an email"
                    aria-label="social media"
                    arrow
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=palad.jarvis@gmail.com"
                      className={classes.email}
                      style={{ letterSpacing: !fullScreen ? "3px" : "1px" }}
                    >
                      palad.jarvis@gmail.com
                    </a>
                  </Tooltip>
                  <div
                    className={classes.contact}
                    style={{ letterSpacing: !fullScreen ? "3px" : "1px" }}
                  >
                    +639760278915
                  </div>
                </Fade>
              </div>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default AboutMe;
