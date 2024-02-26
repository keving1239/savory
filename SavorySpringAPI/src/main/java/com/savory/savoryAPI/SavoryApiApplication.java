package com.savory.savoryAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@EntityScan("com.savory.savoryAPI")
@SpringBootApplication
public class SavoryApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(SavoryApiApplication.class, args);
	}
}
