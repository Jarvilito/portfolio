import { backendUrl } from "./Backend.model";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";

export const authOptions = [
  {
    label: "Google",
    url: `${backendUrl}/auth/google`,
    color: "#e57373",
    icon: EmailIcon,
  },
  {
    label: "GitHub",
    url: `${backendUrl}/auth/github`,
    color: "#424242",
    icon: GitHubIcon,
  },

];
