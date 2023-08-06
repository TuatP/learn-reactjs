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

import edu.poly.shop.dao.OrderDetailDAO;
import edu.poly.shop.entity.Customer;
import edu.poly.shop.entity.Order;
import edu.poly.shop.entity.OrderDetail;

@RestController
@CrossOrigin
@RequestMapping("api/orderDetails")
public class OrderDetailRestController {
	
	@Autowired
	OrderDetailDAO orderDetailDAO;
	
	@PostMapping("")
	public ResponseEntity<OrderDetail> addOrderDetail (@RequestBody OrderDetail orderDetail){
		orderDetailDAO.save(orderDetail);
		return ResponseEntity.ok(orderDetail);
	}
	
	@GetMapping("/list")
	public List<OrderDetail> listOrderDetail() {
		return orderDetailDAO.findAll();
	}
}
