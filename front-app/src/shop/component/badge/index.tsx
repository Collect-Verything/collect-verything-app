import { Avatar, Box, IconButton, Menu, Tooltip, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { logout, useAppDispatch } from "../../../features/authentication-slice";
import { useNavigate } from "react-router-dom";
import { PATH_NAME } from "../../../common/const/path";

const settings = ["Profile", "Dashboard", "Logout"];

export const UserBadge = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (arg: string) => {
        if (arg === "Logout") {
            dispatch(logout());
        }
        if (arg === "Dashboard") {
            navigate(`/${PATH_NAME.ADMIN}`);
        }
        if (arg === "Profile") {
            navigate(`/${PATH_NAME.ADMIN}/${PATH_NAME.ACCOUNT}`);
        }
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Tooltip>
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
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                        <Typography sx={{ textAlign: "center" }} color={setting === "Logout" ? "red" : ""}>
                            {setting}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};
