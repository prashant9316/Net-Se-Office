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
    path: "/",
    icon: <GridViewIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,

    // subNav: [
    //   {
    //     title: "eCommerce",
    //     path: "/ecommerce/",
    //   },
    //   {
    //     title: "Analytics",
    //     path: "/analytics/",
    //   },
    //   {
    //     title: "Project Management",
    //     path: "/project-management/",
    //   },
    //   {
    //     title: "LMS Courses",
    //     path: "/lms-courses/",
    //   },
    // ],
  },
  {
    title: "Profile",
    path: "/pages/profile/",
    icon: <LayersIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,

    // subNav: [
    //   {
    //     title: "My Profile",
    //     path: "/apps/file-manager/",
    //   },
    //   {
    //     title: "Account Settings",
    //     path: "/settings/account/",
    //   }
    // ],
  },
  {
    title: "Calendar",
    path: "/apps/calendar/",
    icon: <MailOutlineIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,

    // subNav: [
    //   {
    //     title: "View Calendar",
    //     path: "/email/inbox/",
    //   },
    //   {
    //     title: "Read Email",
    //     path: "/email/read-email/",
    //   },
    // ],
  },
  {
    title: "Attendance",
    path: "/attendance",
    icon: <MailOutlineIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />
  },
  {
    title: "To Do List",
    path: "/apps/to-do/",
    icon: <PostAddIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,

    // subNav: [
    //   {
    //     title: "Contact List",
    //     path: "/contact-list/",
    //   },
    //   {
    //     title: "Members Grid",
    //     path: "/contact-list/contact-list2/",
    //   },
    //   {
    //     title: "Members List",
    //     path: "/contact-list/members-list/",
    //   },
    //   {
    //     title: "Profile",
    //     path: "/contact-list/profile/",
    //   },
    // ],
  },
  {
    title: "Salary Slips",
    path: "/pages/invoice/",
    icon: <CopyAllIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,

    subNav: [
      {
        title: "View All",
        path: "/pages/invoice",
      },
      {
        title: "Recent",
        path: "/pages/invoice-details/",
      },
      // {
      //   title: "Project Create",
      //   path: "/projects/project-create/",
      // },
      // {
      //   title: "Clients",
      //   path: "/projects/clients/",
      // },
      // {
      //   title: "Team",
      //   path: "/projects/team/",
      // },
      // {
      //   title: "Task",
      //   path: "/projects/task/",
      // },
      // {
      //   title: "User",
      //   path: "/projects/user/",
      // },
      // {
      //   title: "Kanban board",
      //   path: "/projects/kanban-board/",
      // },
    ],
  },
  {
    title: "Notices/Announcements",
    path: "/pages/testimonials/",
    icon: <AddchartIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,

    // subNav: [
    //   {
    //     title: "Customers",
    //     path: "/analytics/customers/",
    //   },
    //   {
    //     title: "Reports",
    //     path: "/analytics/reports/",
    //   },
    // ],
  },
  {
    title: "NetSe Connect Portal",
    path: "/apps/chat/",
    icon: <ShoppingCartCheckoutIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,

    subNav: [
      {
        title: "All Chats",
        path: "/apps/chat/",
      },
      {
        title: "Complete Office",
        path: "/apps/chat/",
      },
    ],
  },
  {
    title: "Support",
    path: "/pages/support/",
    icon: <ViewQuiltIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,
  },
 
  
  {
    title: "Settings",
    path: "/settings/account/",
    icon: <SettingsIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,

    subNav: [
      {
        title: "Account",
        path: "/settings/account/",
      },
      {
        title: "Security",
        path: "/settings/security/",
      },
      {
        title: "Privacy Policy",
        path: "/settings/privacy-policy/",
      },
      {
        title: "Terms & Conditions",
        path: "/pages/terms-conditions/",
      },
      {
        title: "Logout",
        path: "/authentication/logout/",
      },
    ],
  },
];
