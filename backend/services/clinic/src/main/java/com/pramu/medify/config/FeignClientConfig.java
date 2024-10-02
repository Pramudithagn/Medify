//package com.pramu.medify.config;
//import feign.RequestInterceptor;
//import feign.RequestTemplate;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class FeignClientConfig {
//
//    @Bean
//    public RequestInterceptor requestInterceptor() {
//        return new RequestInterceptor() {
//            @Override
//            public void apply(RequestTemplate requestTemplate) {
//                // Add your custom header (e.g., "X-Service-Token") with a token or other identifier
//                requestTemplate.header("X-Service-Token", "your-internal-service-token");
//                System.out.println("Added X-Service-Token header to Feign request.");
//            }
//        };
//    }
//}
