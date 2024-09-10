import React, { useState, useEffect, useRef } from "react";
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
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { TransitionGroup } from "react-transition-group";
import { Collapse } from "@mui/material";
import dayjs from "dayjs";
import { tokens } from "../theme";

const Notifications = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New message from Dr. Smith",
      createdDate: "2024-09-10T12:30:00Z",
    },
    {
      id: 2,
      message: "Payment for appointment due",
      createdDate: "2024-09-09T09:15:00Z",
    },
    {
      id: 3,
      message: "Your lab report is ready",
      createdDate: "2024-09-08T14:00:00Z",
    },
    {
      id: 4,
      message: "New treatment assigned",
      createdDate: "2024-09-07T16:20:00Z",
    },
    {
      id: 5,
      message: "Appointment reminder for tomorrow",
      createdDate: "2024-09-06T18:10:00Z",
    },
    {
      id: 6,
      message: "Your lab report is ready",
      createdDate: "2024-09-08T14:00:00Z",
    },
    {
      id: 7,
      message: "New treatment assigned",
      createdDate: "2024-09-07T16:20:00Z",
    },
    {
      id: 8,
      message: "Appointment reminder for tomorrow",
      createdDate: "2024-09-06T18:10:00Z",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(notifications.length);
  const dropdownRef = useRef(null);

  const handleMarkAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif.id !== id)
    );
    setUnreadCount((prevCount) => prevCount - 1);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setUnreadCount(notifications.length);
  }, [notifications]);

  return (
    <Box position="relative" ref={dropdownRef}>
      <IconButton onClick={() => setIsOpen(!isOpen)}>
        <Badge
          badgeContent={unreadCount}
          color="error"
          invisible={unreadCount === 0}
        >
          <NotificationsOutlinedIcon />
        </Badge>
      </IconButton>

      {isOpen && (
        <Box
          position="absolute"
          top="40px"
          right="0"
          width="300px"
          bgcolor={colors.primary[400]}
          boxShadow={3}
          borderRadius="8px"
          zIndex="10"
          sx={{
            border: "1px solid #ccc",
            px: "8px",
            overflowY: "auto",
            maxHeight: "30vh",
          }}
        >
          {notifications.length > 0 ? (
            <List>
              <TransitionGroup>
                {notifications.map((notification) => (
                  <Collapse key={notification.id}>
                    <ListItem
                      secondaryAction={
                        <IconButton
                          edge="end"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <CheckIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={notification.message}
                        secondary={dayjs(notification.createdDate).format(
                          "MMMM D, YYYY h:mm A"
                        )}
                      />
                    </ListItem>
                    <Divider />
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
