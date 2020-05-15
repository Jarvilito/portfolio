import React, { useState } from "react";
import { formatDistance } from "date-fns";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
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
import YouTubeIcon from "@material-ui/icons/YouTube";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import JarvisCover from "../img/jarvis-cover.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    // height: "100vh",
    // maxHeight: "350px",
    marginBottom: "200px",
  },
  title: {
    fontSize: "40px",
    margin: "20px",
    letterSpacing: "5px",
  },

  content: {
    fontSize: "18px",
  },
  padding: {
    padding: "25px",
  },
  avatar: {
    display: "block",
    margin: "0 auto",
    marginTop: "20px",
    height: "100%",
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
    fontSize: "40px",
  },
  footer: {
    fontSize: "20px",
    letterSpacing: "5px",
  },

  paddingBottom: {
    padding: "15px 0",
  },
  contact: {
    fontSize: "20px",
    fontWeight: "500",
  },

  centerText: {
    textAlign: "center",
  },

  coverPhoto: {
    maxWidth: "100vw",
    width: "650px",
    height: "100%",
  },
}));

function AboutMe() {
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
    {
      label: "YouTube",
      color: "red",
      materialIcon: YouTubeIcon,
      link:
        "https://www.youtube.com/channel/UCjKXPVlP8ew6dQF3XHo6i9Q/featured?view_as=subscriber",
    },
  ]);

  const yearOfExp = formatDistance(new Date(), new Date(2017, 2, 8));

  const mobileYearofExp = formatDistance(new Date(), new Date(2019, 7, 1));

  const [aboutMe] = useState({
    header: "About Me",
    description: `Hi, I am Jarvis Lorenz De Villa Palad, web / hybrid mobile app developer, born in Philippines. Living in Quezon City. With ${yearOfExp} experience on web development, and ${mobileYearofExp} experience on cross platform development. Welcome to my portfolio. Keep scrolling to know more about me`,
    footer: "Connect With Me",
  });
  return (
    <div className={classes.root} id="aboutMe">
      <div className={classes.centerText}>
        <Fade bottom>
          <Typography gutterBottom variant="button" className={classes.title}>
            {aboutMe.header}
          </Typography>
        </Fade>
      </div>
      <Divider />
      <Container maxWidth="sm">
        <Grid container justify="center">
          <Grid item>
            <div>
              <Fade>
                <Avatar
                  variant="round"
                  className={classes.avatar}
                  alt="Jarvis Palad"
                  src="https://scontent.fmnl17-2.fna.fbcdn.net/v/t1.0-9/p960x960/64285700_10212124684991600_5599372718043561984_o.jpg?_nc_cat=111&_nc_sid=7aed08&_nc_eui2=AeH9ZtM6mFP5EUjOjF3vbWKVMLSWiMc9uwcwtJaIxz27B4thklo7w-yDoI_3QpVOODg&_nc_ohc=OV6T8GBzdgMAX_0zdwu&_nc_ht=scontent.fmnl17-2.fna&_nc_tp=6&oh=3cbd45f7c913fe9882ca148995ead484&oe=5EC99CFC"
                ></Avatar>
                {/* <img
                  src={JarvisCover}
                  className={classes.coverPhoto}
                  alt="Jarvis"
                /> */}
              </Fade>
            </div>
          </Grid>
          <Grid item>
            <Fade bottom>
              <Card className={`${classes.padding} ${classes.noBorder}`}>
                <CardContent>
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
                  {/* <Card>
                  <CardContent> */}
                  <div className={classes.paddingBottom}>
                    {/* <AddCircleOutlineIcon color="primary" /> */}
                    <Typography
                      className={classes.footer}
                      gutterBottom
                      variant="button"
                    >
                      {aboutMe.footer}
                    </Typography>
                  </div>

                  <Divider variant="middle" />
                  <Fade left>
                    <div>
                      {icons.map((icon) => {
                        return (
                          <Tooltip
                            key={icon.label}
                            title={icon.label}
                            aria-label="social media"
                            arrow
                          >
                            <IconButton href={icon.link} target="_blank">
                              <icon.materialIcon
                                className={`${classes.iconSpace} ${classes.iconClass}`}
                                style={{ color: icon.color }}
                              />
                            </IconButton>
                          </Tooltip>
                        );
                      })}
                    </div>
                    <div
                      className={classes.contact}
                      style={{ letterSpacing: !fullScreen ? "5px" : "1px" }}
                    >
                      palad.jarvis@gmail.com
                    </div>
                    <div
                      className={classes.contact}
                      style={{ letterSpacing: !fullScreen ? "5px" : "1px" }}
                    >
                      +639212385207
                    </div>
                  </Fade>
                  {/* </CardContent>
                </Card> */}
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default AboutMe;
