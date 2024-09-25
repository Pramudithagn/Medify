//package com.pramu.medify.notification;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//
//public interface NotificationRepository extends JpaRepository<Notification, Long> {
//
//    List<Notification> findByUserId(Long userId);
//    Notification findById(long id);
//}

package com.pramu.medify.notification;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserIdAndUserType(Long userId, String userType);  // Updated to use userId and userType
}
