package edu.poly.shop.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.poly.shop.dao.OrderDAO;
import edu.poly.shop.entity.Category;
import edu.poly.shop.entity.Order;

@RestController
@CrossOrigin
@RequestMapping("/api/orders")
public class OrderRestController {
	@Autowired
	OrderDAO orderDAO;
	
	@PostMapping("")
	public ResponseEntity<Order> addOrder(@RequestBody Order order) {
		orderDAO.save(order);
		return ResponseEntity.ok(order);
	}
	
	@GetMapping("/list")
	public List<Order> listOrder() {
		return orderDAO.findAll();
	}
	

}
