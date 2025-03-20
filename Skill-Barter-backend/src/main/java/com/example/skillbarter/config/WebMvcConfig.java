package com.example.skillbarter.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class WebMvcConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        // Allow any origin using allowedOriginPatterns with wildcard
                        .allowedOriginPatterns("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "dcaimmlzg"); // Replace with your Cloudinary cloud name if needed
        config.put("api_key", "395946545282734"); // Replace with your Cloudinary API key if needed
        config.put("api_secret", "Nm4to_mPpkQfX5cL_D8NneQNT4I"); // Replace with your Cloudinary API secret if needed
        config.put("secure", "true");
        return new Cloudinary(config);
    }
}
