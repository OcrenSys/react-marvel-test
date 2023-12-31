import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import routesConfig from "../../constant/routesConfig";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useAuth0 } from "@auth0/auth0-react";
import User from "../../types/user";

const Layout = () => {
  const urls = routesConfig();
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();

  const [userStorage, setUserStorage] = useState<User>();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const authOptions = [
    {
      label: "LogIn",
      handle: () => {
        handleLogIn();
      },
      hidden: Boolean(userStorage),
    },
    {
      label: "LogOut",
      handle: () => {
        handleLogOut();
      },
      hidden: !Boolean(userStorage),
    },
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogIn = async () => {
    await loginWithRedirect();
  };

  const handleLogOut = () => {
    logout();
    localStorage.setItem("user", "");
  };

  useEffect(() => {
    if (isAuthenticated) localStorage.setItem("user", JSON.stringify(user));
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    setUserStorage(!!userData ? JSON.parse(userData) : null);
  }, [isAuthenticated, loginWithRedirect, logout]);

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* BEGIN DESKTOP MENU */}
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              Marvel App
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {urls?.length &&
                urls?.map((url, index) => (
                  <MenuItem key={index}>
                    <Link to={url.path} style={{ color: "white" }}>
                      <Typography
                        variant="h6"
                        component="div"
                        textAlign="center"
                      >
                        {url.title}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
            </Box>
            {/* END DESKTOP MENU */}

            {/* BEGIN MOBILE MENU */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {urls?.length &&
                  urls?.map((url, index) => (
                    <MenuItem key={index}>
                      <Link to={url.path}>
                        <Typography
                          variant="h6"
                          component="div"
                          textAlign="center"
                        >
                          {url.title}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>

            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ flexGrow: 2, display: { xs: "flex", md: "none" } }}
            >
              Marvel
            </Typography>
            {/* END MOBILE MENU */}

            {/* BEGIN USER MENU */}
            <Box sx={{ flexGrow: 0 }}>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {Boolean(userStorage) && (
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      style={{ marginRight: 16 }}
                      variant="body1"
                      noWrap
                      component="div"
                    >
                      {`${userStorage?.name}`}
                    </Typography>
                    <Typography
                      style={{ marginRight: 16 }}
                      variant="body2"
                      noWrap
                      component="div"
                    >
                      {userStorage?.email}
                    </Typography>
                  </Box>
                )}

                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        Boolean(userStorage)
                          ? userStorage?.picture
                          : "img/not_auth.jpg"
                      }
                    />
                  </IconButton>
                </Tooltip>
              </Box>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {authOptions.map(
                  ({ label, handle, hidden }, index: number) =>
                    !hidden && (
                      <MenuItem key={index} onClick={handle}>
                        <Typography textAlign="center">{label}</Typography>
                      </MenuItem>
                    )
                )}
              </Menu>
            </Box>
            {/* END USER MENU */}
          </Toolbar>
        </Container>
      </AppBar>

      <Outlet />
    </>
  );
};

export default Layout;
