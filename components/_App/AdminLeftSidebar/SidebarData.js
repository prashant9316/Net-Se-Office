import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GridViewIcon from "@mui/icons-material/GridView";
import LayersIcon from "@mui/icons-material/Layers";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LockIcon from "@mui/icons-material/Lock";
import SettingsIcon from "@mui/icons-material/Settings";
import PostAddIcon from "@mui/icons-material/PostAdd";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AddchartIcon from "@mui/icons-material/Addchart";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <GridViewIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,

  },
  {
    title: "Employees",
    path: "/admin/employee",
    icon: <LayersIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,
  },
  {
    title: "Tasks",
    path: "/admin/employee/task",
    icon: <LayersIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,

  },
  {
    title: "Attendance",
    path: "/admin/attendance",
    icon: <LayersIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,

    subNav: [
      {
        title: 'List View (Alpha)',
        path: '/admin/attendance'
      },
      {
        title: 'Calendar View (Beta)',
        path: '/admin/attendance/calendar'
      }
    ]

  },
  {
    title: "Notices",
    path: "/admin/notices",
    icon: <MailOutlineIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,

    subNav: [
      {
        title: "All",
        path: "/admin/notices",
      },
      {
        title: "New",
        path: "/admin/notices/new",
      }
    ],
  },

  {
    title: "Salary Slips",
    path: "/admin/salary-slip",
    icon: <CopyAllIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,

    subNav: [
      {
        title: "View All",
        path: "/admin/salary-slip",
      },
      {
        title: "detailed",
        path: "/admin/salary-slip/details",
      },
      {
        title: "Generate New",
        path: "/admin/salary-slip/new"
      }
     
    ],
  },
  {
    title: "NetSe Connect Portal",
    path: "/admin/chat/",
    icon: <ShoppingCartCheckoutIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,

  },
  
  {
    title: "Settings",
    path: "/admin/settings/account/",
    icon: <SettingsIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,

    subNav: [
      {
        title: "Account",
        path: "/admin/settings/account/",
      },
      {
        title: "Security",
        path: "/admin/settings/security/",
      },
      {
        title: "Privacy Policy",
        path: "/admin/settings/privacy-policy/",
      },
      {
        title: "Terms & Conditions",
        path: "/admin/pages/terms-conditions/",
      },
      {
        title: "Logout",
        path: "/authentication/logout/",
      },
    ],
  },
];
