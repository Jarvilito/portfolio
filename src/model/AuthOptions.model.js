import { backendUrl } from "./Backend.model";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";

export const authOptions = [
  {
    label: "Facebook",
    url: `${backendUrl}/auth/facebook`,
    color: "#3b5998",
    icon: FacebookIcon,
  },
  {
    label: "GitHub",
    url: `${backendUrl}/auth/github`,
    color: "#424242",
    icon: GitHubIcon,
  },
  // {
  //   label: "Instagram",
  //   url: `${backendUrl}/auth/instagram`,
  //   color: "#c62828",
  //   icon: InstagramIcon,
  // },
  {
    label: "Google",
    url: `${backendUrl}/auth/google`,
    color: "#e57373",
    icon: EmailIcon,
  },
];
