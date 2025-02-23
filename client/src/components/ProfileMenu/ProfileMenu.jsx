import React from 'react';
import { Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ProfileMenu = ({ user, logout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <IconButton onClick={handleClick}>
        <Avatar
          alt={user?.name}
          src={user?.picture}
          sx={{ width: 40, height: 40 }} // Adjust avatar size
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom', // Dropdown aligns below the avatar
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top', // Ensures the dropdown opens above the avatar
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={()=> navigate('./favourites', {replace: true}) }>Favorites</MenuItem>

        <MenuItem onClick={()=> navigate('./bookings', {replace: true}) }>Bookings</MenuItem>

        <MenuItem onClick={()=> {
            localStorage.clear();
            logout();
        }}>Log Out</MenuItem>

        {/* You can add more menu items here */}
      </Menu>
    </div>
  );
};

export default ProfileMenu;
