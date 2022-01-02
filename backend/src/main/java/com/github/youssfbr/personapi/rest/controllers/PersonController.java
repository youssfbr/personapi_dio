package com.github.youssfbr.personapi.rest.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/peoples")
public class PersonController {

    @GetMapping
    public String getPerson() {
        return "OK!";
    }
}
