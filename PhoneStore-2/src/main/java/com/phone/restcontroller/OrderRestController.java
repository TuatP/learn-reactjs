package com.phone.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.phone.dao.CustomerDAO;
import com.phone.dao.OrderDAO;
import com.phone.entity.Customer;
import com.phone.entity.Order;
import com.phone.form.OrderForm;


@RestController
@CrossOrigin
@RequestMapping("/api/orders")
public class OrderRestController {
	@Autowired
	OrderDAO orderDAO;
	
	@Autowired
	CustomerDAO customerDAO;
	
	@PostMapping("")
	public ResponseEntity<Order> addOrder(@RequestBody OrderForm orderForm) {
		Customer customer = customerDAO.findByUsername(orderForm.getUsername());
		
		Order order = new Order();
		
		order.setCustomer(customer);
		order.setAddress(orderForm.getAddress());
		order.setConfirm(false);	
		
		orderDAO.save(order);
		return ResponseEntity.ok(order);
	}
	
	@GetMapping("/list")
	public List<Order> listOrder() {
		return orderDAO.findAllByOrderByIdDesc();
	}
	
	   @PutMapping("/confirm/{orderId}")
	    public void confirmOrder(@PathVariable Integer orderId) {
	            orderDAO.confirmOrder(orderId);
	    }
		@DeleteMapping("/delete/{id}")
		public ResponseEntity<String> deleteCategory(@PathVariable Integer id){
	        try {
	            orderDAO.deleteById(id);
	            return new ResponseEntity<>("Order deleted successfully", HttpStatus.OK);
	        } catch (Exception e) {
	            return new ResponseEntity<>("Failed to delete order", HttpStatus.INTERNAL_SERVER_ERROR);
	        }
		}
		
		@GetMapping("/page")
		public Page<Order> getAllCustomerByPage(
				@RequestParam(name = "page", defaultValue =  "0") int page,
				@RequestParam(name = "size", defaultValue =  "10") int size
				){
			Pageable pageable = PageRequest.of(page, size);
			return orderDAO.findAll(pageable);
		}

}
