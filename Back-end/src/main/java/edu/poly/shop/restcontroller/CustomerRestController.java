package edu.poly.shop.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import edu.poly.shop.dao.CustomerDAO;
import edu.poly.shop.entity.Customer;
import edu.poly.shop.form.LoginForm;

@RestController
@CrossOrigin
@RequestMapping("api/customers")
public class CustomerRestController {
	
	@Autowired
	CustomerDAO customerDAO;
	
	@PostMapping("")
	public ResponseEntity<Customer> addCustomer (@ModelAttribute Customer customer){
		customerDAO.save(customer);
		return ResponseEntity.ok(customer);
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
	
	

}
