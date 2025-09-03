import EditDocumentIcon from '@mui/icons-material/EditDocument';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import EditIcon from '@mui/icons-material/Edit';
import {type Navigation} from '@toolpad/core';
import LogoutIcon from '@mui/icons-material/Logout';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import JoinFullIcon from '@mui/icons-material/JoinFull';

export const BRANDING ={
  logo: <img src="favicon.ico" alt="Logo" />,
  title: 'Smilecheck',
  homeUrl: '/Home',
}

export const NAVIGATION_ADMIN : Navigation = [
  {
    kind: 'header',
    title: 'Clinician Tabs',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <EditDocumentIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Admin Tabs',
  },
  {
    segment: 'create',
    title: 'Create User',
    icon: <AddReactionIcon />,
  },
  {
    segment: 'manage',
    title: 'Manage Users',
    icon: <EditIcon />,
  },
  {
    segment: 'pair',
    title: 'Pair',
    icon: <JoinInnerIcon />,
  },  
  {
    segment: 'seePairs',
    title: 'See pairs',
    icon: <JoinFullIcon />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'logout',
    title: 'Logout',
    icon: <LogoutIcon />,
  },
];

export const NAVIGATION_CLINICIAN : Navigation = [
  {
    kind: 'header',
    title: 'Clinician Tabs',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <EditDocumentIcon />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'logout',
    title: 'Logout',
    icon: <LogoutIcon />,
  },
];
