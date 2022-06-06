// hooks

// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {


  return (
    <Avatar
      src="https://cdn.pixabay.com/photo/2020/05/11/15/38/tom-5158824_960_720.png"
      alt="logo"
      // color={user?.photoURL ? 'default' : createAvatar(user?.displayName).color}
      // {...other}
    >
      {/* {createAvatar(user?.displayName).name} */}
    </Avatar>
  );
}
