// hooks

// utils
import createAvatar from "../utils/createAvatar";
//
import Avatar from "./Avatar";

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  return (
    // <Avatar
    //   src={user?.photoURL}
    //   alt={user?.displayName}
    //   color={user?.photoURL ? 'default' : createAvatar(user?.displayName).color}
    //   {...other}
    // >
    //   {createAvatar(user?.displayName).name}
    // </Avatar>

    <Avatar
      src='https://pbs.twimg.com/media/EYUhsP4U0AATo-h?format=jpg&name=900x900'
      alt='Mamba'
      color='default'
      {...other}
    ></Avatar>
  );
}
