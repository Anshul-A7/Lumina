package com.jeevan.smart_notes_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SmartNotesApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartNotesApiApplication.class, args);
	}

}
