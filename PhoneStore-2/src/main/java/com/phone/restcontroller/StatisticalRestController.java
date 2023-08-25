package com.phone.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.phone.dao.OrderDAO;

@CrossOrigin
@RequestMapping("api/report")
@RestController
public class StatisticalRestController {
	
	@Autowired
	OrderDAO orderDAO;
	
	@GetMapping("user")
	public ResponseEntity<List<Object[]>> getTop5User(){
		List<Object[]> topUser = orderDAO.findTop5CustomerByOrderCount();
		return ResponseEntity.ok(topUser);
	}

}
