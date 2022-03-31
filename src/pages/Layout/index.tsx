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

const Layout = () => {
  const urls = routesConfig();
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();

  const authOptions = [
    {
      label: "LogIn",
      handle: () => {
        loginWithRedirect();
      },
    },
    {
      label: "LogOut",
      handle: () => {
        logout();
      },
    },
  ];

  const [userStorage, setUserStorage] = useState<any>(null);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

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

                {isAuthenticated && (
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
                      style={{ marginLeft: 16 }}
                      variant="body1"
                      noWrap
                      component="div"
                    >
                      {`${user?.name} | ${user?.nickname}`}
                    </Typography>
                    <Typography
                      style={{ marginLeft: 16 }}
                      variant="button"
                      noWrap
                      component="div"
                    >
                      {user?.email}
                    </Typography>
                  </Box>
                )}
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
                {authOptions.map(({ label, handle }, index: number) => (
                  <MenuItem key={index} onClick={handle}>
                    <Typography textAlign="center">{label}</Typography>
                  </MenuItem>
                ))}
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
