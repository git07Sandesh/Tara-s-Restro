import React, { useState } from "react";
import Logo from "../Assets/Logo.svg";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      link: "/",
    },
    {
      text: "Menu",
      icon: <InfoIcon />,
      link: "/menu",
    },
    {
      text: "Photoes",
      icon: <CommentRoundedIcon />,
      link: "/photoes",
    },
    {
      text: "Login",
      icon: <PhoneRoundedIcon />,
      link: "/login",
    },
    {
      text: "Register",
      icon: <PhoneRoundedIcon />,
      link: "/register",
    },
    {
      text: "Cart",
      icon: <ShoppingCartRoundedIcon />,
      link: "/checkout",
    },
    ,
  ];
  return (
    <nav className="flex items-center justify-between min-h-[90px] px-6">
      <div className="flex gap-6 md:gap-12 lg:gap-18">
        <div className="nav-logo-container">
          <img src={Logo} alt="Logo" className="h-10" />
        </div>
        <div className="hidden md:flex items-center gap-6 md:gap-12">
          <NavLink to ="/" className={({ isActive }) =>
            isActive ? "active text-amber-800 text-lg font-semibold" : "text-black text-lg font-semibold"
          }>Home</NavLink>
          <Link to="/menu" className="text-black text-lg font-semibold">Menu</Link>
          <Link to ="/photoes" className="text-black text-lg font-semibold">Photoes </Link>
          <Link to ="/contact" className="text-black text-lg font-semibold">Contact </Link>
        </div>
      </div>
        <div className="hidden md:flex items-center space-x-4">
        <Link to="/login" className="text-black text-lg border-2 py-2 px-4 rounded-3xl font-semibold">Login</Link>
        <Link to="/register" className="text-black text-lg py-2 px-4 font-semibold bg-amber-500 rounded-3xl">Register</Link>
        <button className="py-3 bg-white border-none rounded-full text-lg font-semibold transition duration-200 hover:bg-gray-200"><BsCart2 className="text-xl" /></button>
        </div>

      
      <div className="md:hidden">
        <HiOutlineBars3 className="text-2xl cursor-pointer" onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.link}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
