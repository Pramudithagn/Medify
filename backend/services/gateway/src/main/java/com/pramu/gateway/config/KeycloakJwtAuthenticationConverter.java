package com.pramu.gateway.config;

//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.core.convert.converter.Converter;
//import org.springframework.lang.NonNull;
//import org.springframework.security.authentication.AbstractAuthenticationToken;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.oauth2.jwt.Jwt;
//import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
//import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
//import org.springframework.stereotype.Component;
//
//import java.util.Collection;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Stream;
//
//import static java.util.stream.Collectors.toSet;
//
//@Component
//public class KeycloakJwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {
//
//    @Value("${keycloak.resource.access.clientid}")
//    private String clientId;
//
//    @Override
//    public AbstractAuthenticationToken convert(@NonNull Jwt source) {
//        return new JwtAuthenticationToken(
//                source,
//                Stream.concat(
//                        new JwtGrantedAuthoritiesConverter().convert(source).stream(),
//                        extractResourceRoles(source).stream()
//                ).collect(toSet())
//        );
//    }
//
//    private Collection<? extends GrantedAuthority> extractResourceRoles(Jwt jwt) {
//        var resourceAccess = new HashMap<>(jwt.getClaim("resource_access"));
//        var resource = (Map<String, List<String>>) resourceAccess.get(clientId);
//        var roles = resource != null ? resource.get("roles") : List.of();
//        return roles.stream()
////                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()))
//                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.toString().toUpperCase()))
//
//                .collect(toSet());
//    }
//}


import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class KeycloakJwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        Collection<GrantedAuthority> authorities = extractAuthorities(jwt);
        return new JwtAuthenticationToken(jwt, authorities);
    }
    private Collection<GrantedAuthority> extractAuthorities(Jwt jwt) {
        Map<String, Object> resourceAccess = jwt.getClaim("resource_access");

        if (resourceAccess != null) {
            Map<String, Object> resource = (Map<String, Object>) resourceAccess.get("account");

            if (resource != null) {
                List<String> roles = (List<String>) resource.get("roles");

                return roles.stream()
                        .map(role -> new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()))
                        .collect(Collectors.toList());
            }
        }
        return List.of();
    }
}
