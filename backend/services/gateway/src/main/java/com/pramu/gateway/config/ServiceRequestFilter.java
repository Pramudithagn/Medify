//package com.pramu.gateway.config;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.server.SecurityWebFilterChain;
//import org.springframework.stereotype.Component;
//import org.springframework.web.server.ServerWebExchange;
//import org.springframework.web.server.WebFilter;
//import org.springframework.web.server.WebFilterChain;
//import reactor.core.publisher.Mono;
//
//@Component
//public class ServiceRequestFilter implements WebFilter {
//
//    @Override
//    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
//        // Here you can implement your logic to identify if it's a service request.
//        // For example, check for a specific header or the source IP.
//        // Here is an example using a custom header "X-Service-Token".
//        if (exchange.getRequest().getHeaders().containsKey("X-Service-Token")) {
//            // If this is a service request, allow it to proceed without authentication
//            return chain.filter(exchange);
//        }
//        // If it is not a service request, proceed with normal security checks
//        return chain.filter(exchange);
//    }
//}
