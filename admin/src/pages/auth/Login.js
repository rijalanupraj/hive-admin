import { capitalCase } from "change-case";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Stack,
  Link,
  Alert,
  Tooltip,
  Container,
  Typography,
} from "@mui/material";
// routes
import { PATH_AUTH } from "../../routes/paths";
// hooks
// import useAuth from '../../hooks/useAuth';
import useResponsive from "../../hooks/useResponsive";
// components
import Page from "../../components/Page";
import Logo from "../../components/Logo";
import Image from "../../components/Image";
// sections
import { LoginForm } from "../../sections/auth/login";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 120,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  // const { method } = useAuth();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const smUp = useResponsive("up", "sm");

  const mdUp = useResponsive("up", "md");

  if (auth.isAuthenticated) {
    navigate("/dashboard");
  }

  return (
    <Page title="Login">
      <RootStyle>
        {mdUp && (
          <SectionStyle>
            <Box sx={{ mt:4, ml: 5 }}>
              <Logo />
            </Box>
            <Typography variant="h3" sx={{ px: 5, mt: 7, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <Image
              alt="login"
              src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000"
            />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Sign in to Samadhan
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Enter your details below.
                </Typography>
              </Box>

              {/* <Tooltip title='hello' placement="right">
                <>
                  <Image
                    disabledEffect
                    src={`https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000`}
                    sx={{ width: 32, height: 32 }}
                  />
                </>
              </Tooltip> */}
            </Stack>

            {/* <Alert severity="info" sx={{ mb: 3 }}>
              Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
            </Alert> */}

            <LoginForm />

            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{" "}
                <Link variant="subtitle2" component={RouterLink} to="/">
                  Get started
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
