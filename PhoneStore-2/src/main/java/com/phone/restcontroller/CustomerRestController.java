package com.phone.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.phone.dao.CustomerDAO;
import com.phone.entity.Category;
import com.phone.entity.Customer;
import com.phone.form.LoginForm;



@RestController
@CrossOrigin
@RequestMapping("api/customers")
public class CustomerRestController {
	
	@Autowired
	CustomerDAO customerDAO;
	
	@PostMapping("")
	public ResponseEntity<Customer> addCustomer (@RequestBody Customer customer){
		customerDAO.save(customer);
		return ResponseEntity.ok(customer);
	}
	
	@GetMapping("list")
	public List<Customer> listCustomer(){
		return customerDAO.findAll();
	}
	
	@GetMapping("/{username}")
	public ResponseEntity<Customer> getOne (@PathVariable("username") String username){
		if(!customerDAO.existsById(username)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(customerDAO.findById(username).get());
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> login (@RequestBody LoginForm loginForm){
		String username = loginForm.getUsername();
		String passsword = loginForm.getPassword();
		
		Customer customer = customerDAO.findByUsername(username);
		
		if(customer == null || !customer.getPassword().equals(passsword)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login not success");
		}
		return ResponseEntity.ok("" + customer.getUsername());
	}
	
	//change password
	@PutMapping("/changePassword/{username}")
	public ResponseEntity<Customer> changePassword(@PathVariable String username,@RequestBody Customer customer){
		try {
			if(!customerDAO.existsById(username)) {
				return ResponseEntity.notFound().build();
			}
			
			Customer findCustomer = customerDAO.findByUsername(username);
			
			findCustomer.setPassword(customer.getPassword());
			
			Customer customerUpdate = customerDAO.save(findCustomer);
			
			return ResponseEntity.ok(customerUpdate);
		} catch (Exception e) {
	        return ResponseEntity.badRequest().build();
		}
		
	}
	
	//edit profile
	@PutMapping("/{username}")
	public ResponseEntity<Customer> updateCustomer(@PathVariable String username,@RequestBody Customer customer){
		try {
			if(!customerDAO.existsById(username)) {
				return ResponseEntity.notFound().build();
			}
			
			Customer findCustomer = customerDAO.findByUsername(username);
			
			findCustomer.setEmail(customer.getEmail());
			findCustomer.setName(customer.getName());
			findCustomer.setPhone(customer.getPhone());
			
			Customer customerUpdate = customerDAO.save(findCustomer);
			
			return ResponseEntity.ok(customerUpdate);
		} catch (Exception e) {
	        return ResponseEntity.badRequest().build();
		}
		
	}
	
	

}
