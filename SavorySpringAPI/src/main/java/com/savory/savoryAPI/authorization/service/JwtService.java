package com.savory.savoryAPI.authorization.service;

import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.spec.SecretKeySpec;

import java.security.Key;
import java.time.Instant;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class JwtService {
    
    private final AuthenticationService authService;

    private static final SignatureAlgorithm SIGNING_ALGORITHM = SignatureAlgorithm.HS256;

    private static final String SECRET = "my-secret-key";
    private static final Key SIGNING_KEY = new SecretKeySpec(SECRET.getBytes(), SIGNING_ALGORITHM.getJcaName());

    public String getJwtForUser(String userEmail) {
        long ttlSeconds = 30;
        long expireTime = Instant.now().getEpochSecond() + ttlSeconds;

        List<String> userScopes = authService.findUserRoles(userEmail);

        Map<String, Object> claims = Map.of(
                Claims.SUBJECT, userEmail,
                Claims.EXPIRATION, expireTime,
                "scopes", userScopes
        );

        return Jwts.builder()
                .setClaims(claims)
                .signWith(SIGNING_KEY)
                .compact();
    }

    public boolean isValidJwt(String jwt) {

        try {
            Jws<Claims> validJwt = Jwts.parserBuilder()
                    .setSigningKey(SIGNING_KEY)
                    .build()
                    .parseClaimsJws(jwt);

            long expiration = validJwt.getBody().get(Claims.EXPIRATION, Long.class);
            if (expiration < Instant.now().getEpochSecond()) {
                return false;
            }
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public String getTokenFromHeader(String bearerHeader) {
        return bearerHeader.replace("Bearer ", "");
    }

}
