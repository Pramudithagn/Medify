// import React, { useState, useEffect, useRef } from "react";
// import { Box, IconButton, Typography, List, ListItem, ListItemText, Divider, Badge, useTheme } from "@mui/material";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import CheckIcon from "@mui/icons-material/Check";
// import { TransitionGroup } from "react-transition-group";
// import { Collapse } from "@mui/material";
// import dayjs from "dayjs";
// import { tokens } from "../theme";
// import {mockDataNotifications} from "../data/mockData";

// const Notifications = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const [notifications, setNotifications] = useState(mockDataNotifications);

//   const [isOpen, setIsOpen] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(notifications.length);
//   const dropdownRef = useRef(null);

//   const handleMarkAsRead = (id) => {
//     setNotifications((prevNotifications) =>
//       prevNotifications.filter((notif) => notif.id !== id)
//     );
//     setUnreadCount((prevCount) => prevCount - 1);
//   };

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     setUnreadCount(notifications.length);
//   }, [notifications]);

//   return (
//     <Box position="relative" ref={dropdownRef}>
//       <IconButton onClick={() => setIsOpen(!isOpen)}>
//         <Badge
//           badgeContent={unreadCount} 
//           color="error"            
//           invisible={unreadCount === 0} 
//         >
//           <NotificationsOutlinedIcon />
//         </Badge>
//       </IconButton>

//       {isOpen && (
//         <Box
//           position="absolute"
//           top="40px"
//           right="0"
//           width="20vw"
//           bgcolor={colors.primary[400]}
//           boxShadow={3}
//           borderRadius="8px"
//           zIndex="10"
//           sx={{ border: "1px solid #ccc", px: "8px", overflowY: "auto", maxHeight: "30vh" }}
//         >
//           {notifications.length > 0 ? (
//             <List>
//               <TransitionGroup>
//                 {notifications.map((notification, index) => (
//                   <Collapse key={notification.id}>
//                     <ListItem
//                       secondaryAction={
//                         <IconButton edge="end" onClick={() => handleMarkAsRead(notification.id)}>
//                           <CheckIcon />
//                         </IconButton>
//                       }
//                     >
//                       <ListItemText
//                         primary={notification.message}
//                         secondary={dayjs(notification.createdDate).format("MMMM D, YYYY h:mm A")}
//                       />
//                     </ListItem>
//                     {index < notifications.length - 1 && <Divider />}
//                   </Collapse>
//                 ))}
//               </TransitionGroup>
//             </List>
//           ) : (
//             <Typography variant="body2" textAlign="center">
//               No new notifications
//             </Typography>
//           )}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Notifications;

//=================================================================================================================================================


import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Badge,
  useTheme,
  Collapse,
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { TransitionGroup } from "react-transition-group";
import dayjs from "dayjs";
import { tokens } from "../theme";
import { markAsRead, toggleDropdown } from "../features/notificationSlice";

const Notifications = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const notifications = useSelector((state) => state.notification.notifications);
  const unreadCount = useSelector((state) => state.notification.unreadCount);
  const isOpen = useSelector((state) => state.notification.isOpen);

  const dropdownRef = useRef(null);
  const iconRef = useRef(null); 

  const handleMarkAsRead = (id) => {
    dispatch(markAsRead(id));
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      iconRef.current &&
      !iconRef.current.contains(event.target)
    ) {
      if (isOpen) {
        dispatch(toggleDropdown());
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]); 

  return (
    <Box position="relative" ref={dropdownRef}>
      <IconButton ref={iconRef} onClick={() => dispatch(toggleDropdown())}>
        <Badge badgeContent={unreadCount} color="error" invisible={unreadCount === 0}>
          <NotificationsOutlinedIcon />
        </Badge>
      </IconButton>

      {isOpen && (
        <Box
          position="absolute"
          top="40px"
          right="0"
          width="20vw"
          bgcolor={colors.primary[400]}
          boxShadow={3}
          borderRadius="8px"
          zIndex="10"
          sx={{ border: "1px solid #ccc", px: "8px", overflowY: "auto", maxHeight: "30vh" }}
        >
          {notifications.length > 0 ? (
            <List>
              <TransitionGroup>
                {notifications.map((notification, index) => (
                  <Collapse key={notification.id}>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" onClick={() => handleMarkAsRead(notification.id)}>
                          <CheckIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={notification.message}
                        secondary={dayjs(notification.createdDate).format("MMMM D, YYYY h:mm A")}
                      />
                    </ListItem>
                    {index < notifications.length - 1 && <Divider />}
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>
          ) : (
            <Typography variant="body2" textAlign="center">
              No new notifications
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Notifications;
