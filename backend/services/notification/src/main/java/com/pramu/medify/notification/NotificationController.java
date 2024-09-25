//package com.pramu.medify.notification;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/v1/notifications")
//@RequiredArgsConstructor
//public class NotificationController {
//
//    private final NotificationService notificationService;
//
//    @GetMapping("/{userId}")
//    public List<Notification> getNotificationsForUser(@PathVariable Long userId) {
//        return notificationService.getNotificationsForUser(userId);
//    }
//
//    @PutMapping("/mark-read/{id}")
//    public void markNotificationAsRead(@PathVariable Long id) {
//        Notification notification = notificationService.markAsRead(id);
//    }
//}

package com.pramu.medify.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/{userId}")
    public List<Notification> getNotificationsForUser(
            @PathVariable Long userId,
            @RequestParam String userType) {
        return notificationService.getNotificationsForUser(userId, userType);
    }

    @GetMapping("/all")
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @PutMapping("/mark-read/{id}")
    public void markNotificationAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
    }
}
