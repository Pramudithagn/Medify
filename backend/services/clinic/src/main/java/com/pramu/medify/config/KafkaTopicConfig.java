package com.pramu.medify.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    @Bean
    public NewTopic medicalRecordCreatedTopic() {
        return TopicBuilder.name("medical-record-created").build();
    }

    @Bean
    public NewTopic appointmentCreatedTopic() {
        return TopicBuilder.name("appointment-created").build();
    }

    @Bean
    public NewTopic appointmentCancelledTopic() {
        return TopicBuilder.name("appointment-cancelled").build();
    }

}
