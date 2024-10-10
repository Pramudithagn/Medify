//package com.pramu.medify.notification;
//
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class NotificationService {
//
//    private final NotificationRepository notificationRepository;
//
//    public List<Notification> getNotificationsForUser(Long userId ) {
//        return notificationRepository.findByUserId(userId);
//    }
//
//    public void sendNotification(Long userId, String userType, String notificationType, String message) {
//        Notification notification = new Notification();
//        notification.setUserId(userId);
//        notification.setUserType(userType);
//        notification.setNotificationType(notificationType);
//        notification.setMessage(message);
//        notification.setCreatedAt(LocalDateTime.now());
//        notification.setRead(false);
//
//        notificationRepository.save(notification);
//
//    }
//
//    @Transactional
//    public Notification markAsRead(Long id) {
//        Notification notification = notificationRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("Notification fetching went wrong.."));
//        notification.setRead(true);
//        return notificationRepository.save(notification);
//    }
//}

package com.pramu.medify.notification;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public List<Notification> getNotificationsForUser(Long userId, String userType) {
        return notificationRepository.findByUserIdAndUserType(userId, userType);
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public void sendNotification(Long userId, String userType, String notificationType, String message) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setUserType(userType);
        notification.setNotificationType(notificationType);
        notification.setMessage(message);
        notification.setCreatedAt(LocalDateTime.now());
        notification.setRead(false);

        notificationRepository.save(notification);
    }

    @Transactional
    public Notification markAsRead(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Notification fetching went wrong.."));
        notification.setRead(true);
        return notificationRepository.save(notification);
    }
}
