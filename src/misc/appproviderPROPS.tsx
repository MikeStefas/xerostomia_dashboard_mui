import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import EmergencyIcon from '@mui/icons-material/Emergency';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import EditIcon from '@mui/icons-material/Edit';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import {type Navigation} from '@toolpad/core';

export const BRANDING ={
  logo: <img src="favicon.ico" alt="Logo" />,
  title: 'Smilecheck',
  homeUrl: '/Home',
}

export const NAVIGATION : Navigation = [
  {
    kind: 'header',
    title: 'Clinician Tabs',
  },
  {
    segment: 'patients',
    title: 'Patients',
    icon: <AccessibleForwardIcon />,
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
    segment: 'clinicians',
    title: 'Clinicians',
    icon: <EmergencyIcon />,
  },
  {
    segment: 'create',
    title: 'Create User',
    icon: <AddReactionIcon />,
  },
  {
    segment: 'authorize',
    title: 'Authorize Clinician',
    icon: <AddModeratorIcon />,
  },
  {
    segment: 'edit',
    title: 'Edit User',
    icon: <EditIcon />,
  },
  {
    segment: 'pair',
    title: 'Pair User',
    icon: <JoinInnerIcon />,
  },
];
