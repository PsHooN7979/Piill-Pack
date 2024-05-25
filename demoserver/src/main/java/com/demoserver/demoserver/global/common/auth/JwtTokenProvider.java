package com.demoserver.demoserver.global.common.auth;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.demoserver.demoserver.dtos.TokenDto;
import com.demoserver.demoserver.status.auth.UnauthorizedTokenException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Component
public class JwtTokenProvider {
    private final Key accessKey;
    private final Key refreshKey;

    public JwtTokenProvider(@Value("${jwt.access-key}") String accessSecretKey,
            @Value("${jwt.refresh-key}") String refreshSecretKey) {
        byte[] accessKeyBytes = Decoders.BASE64.decode(accessSecretKey);
        this.accessKey = Keys.hmacShaKeyFor(accessKeyBytes);

        byte[] refreshKeyBytes = Decoders.BASE64.decode(refreshSecretKey);
        this.refreshKey = Keys.hmacShaKeyFor(refreshKeyBytes);
    }

    public TokenDto createAllToken(Authentication authentication) {

        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();

        Date accessTokenExpiresIn = new Date(now + 9000000);
        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim("auth", authorities)
                .setExpiration(accessTokenExpiresIn)
                .signWith(accessKey, SignatureAlgorithm.HS256)
                .compact();

        String refreshToken = Jwts.builder()
                .setExpiration(new Date(now + 1209600000))
                .signWith(refreshKey, SignatureAlgorithm.HS256)
                .compact();

        return TokenDto.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public TokenDto createAccessToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date accessTokenExpiresIn = new Date(now + 900000);
        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim("auth", authorities)
                .setExpiration(accessTokenExpiresIn)
                .signWith(accessKey, SignatureAlgorithm.HS256)
                .compact();

        return TokenDto.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .build();
    }

    public TokenDto createRefreshToken(Authentication authentication) {
        long now = (new Date()).getTime();
        String refreshToken = Jwts.builder()
                .setExpiration(new Date(now + 1209600000))
                .signWith(refreshKey, SignatureAlgorithm.HS256)
                .compact();

        return TokenDto.builder()
                .grantType("Bearer")
                .refreshToken(refreshToken)
                .build();
    }

    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);

        String authClaims = claims.get("auth", String.class);
        if (authClaims == null || authClaims.isEmpty()) {
            throw new UnauthorizedTokenException("Unauthorized Token: 'auth' claim is missing or empty");
        }

        Collection<? extends GrantedAuthority> authorities = Arrays.stream(authClaims.split(","))
                .filter(StringUtils::hasText)
                .map(String::trim)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        UserDetails principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    public boolean validateAccessToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(accessKey).build().parseClaimsJws(token);
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {

            throw new RuntimeException("Invalid JWT: " + e.getMessage());
        } catch (ExpiredJwtException e) {

            throw new RuntimeException("Expired JWT: " + e.getMessage());
        } catch (UnsupportedJwtException e) {

            throw new RuntimeException("Unsupported JWT: " + e.getMessage());
        } catch (IllegalArgumentException e) {

            throw new RuntimeException("Invalid arguments provided to JWT parsing: " + e.getMessage());
        }
        return true;
    }

    public boolean validateRefreshToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(refreshKey).build().parseClaimsJws(token);
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {

            throw new RuntimeException("Invalid JWT: " + e.getMessage());
        } catch (ExpiredJwtException e) {

            throw new RuntimeException("Expired JWT: " + e.getMessage());
        } catch (UnsupportedJwtException e) {

            throw new RuntimeException("Unsupported JWT: " + e.getMessage());
        } catch (IllegalArgumentException e) {

            throw new RuntimeException("Invalid arguments provided to JWT parsing: " + e.getMessage());
        }
        return true;
    }

    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(accessKey).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}