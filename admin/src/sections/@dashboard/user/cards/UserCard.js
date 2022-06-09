import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack, Link } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import cssStyles from '../../../../utils/cssStyles';
import { fShortenNumber } from '../../../../utils/formatNumber';
// components
import Image from '../../../../components/Image';
import SocialsButton from '../../../../components/SocialsButton';
import SvgIconStyle from '../../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default function UserCard({ user }) {
  const { name, cover, follower, avatarUrl, following } = user;

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
          alt={name}
          src={avatarUrl}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />
        <OverlayStyle />
        <Image src={cover} alt={cover} ratio="16/9" />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6 }}>
       <Link href={PATH_DASHBOARD.user.root}>{name}</Link>
      </Typography>

    

      <Stack alignItems="center">
        <SocialsButton initialColor sx={{ my: 2.5 }} />
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ py: 3, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Follower
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber(follower)}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Following
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber(following)}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Total Solutions
          </Typography>
          <Typography variant="subtitle1">100</Typography>
        </div>
      </Box>
    </Card>
  );
}
