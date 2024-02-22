package com.savory.savoryAPI;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/v3/api-docs") // Endpoint for OpenAPI documentation
                .allowedOrigins("http://localhost:3000") // Adjust the origin as needed
                .allowedMethods("GET", "PUT", "DELETE", "POST")
                .allowedHeaders("*"); // Allow all headers
        registry.addMapping("/api/**") // Specify the mapping for which CORS should be enabled
                .allowedOrigins("http://localhost:3000") // Allow requests from this origin
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow these HTTP methods
                .allowedHeaders("*"); // Allow all headers
    }
}