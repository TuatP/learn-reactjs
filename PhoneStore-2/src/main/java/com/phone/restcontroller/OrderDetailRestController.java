package com.phone.restcontroller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.phone.dao.OrderDetailDAO;
import com.phone.entity.Category;
import com.phone.entity.OrderDetail;



@RestController
@CrossOrigin
@RequestMapping("api/orderDetails")
public class OrderDetailRestController {
	
	@Autowired
	OrderDetailDAO orderDetailDAO;
	
	@PostMapping("")
	public ResponseEntity<OrderDetail> addOrderDetail (@RequestBody OrderDetail orderDetail){
		System.out.println(orderDetail.toString());
		orderDetailDAO.save(orderDetail);
		return ResponseEntity.ok(orderDetail);
	}

	
	@GetMapping("/list")
	public List<OrderDetail> listOrderDetail() {
		return orderDetailDAO.findAll();
	}
	
	//get all orderDetail by orderId
	@GetMapping("/list/{orderId}")
	public ResponseEntity<List<OrderDetail>> listByOrder(@PathVariable Integer orderId) {
		List<OrderDetail> list = orderDetailDAO.findByOrderId(orderId);
		if(list.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/purchase/{username}")
	public ResponseEntity<List<OrderDetail>> getPurchaseByName(@PathVariable String username){
		List<OrderDetail> purchase = orderDetailDAO.findByCustomerUsername(username);
		
		if(purchase.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(purchase);
	}
	
	
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteCategory(@PathVariable Integer id){
	    Optional<OrderDetail> orderDetailOptional = orderDetailDAO.findById(id);
		if(orderDetailOptional.isPresent()) {
	        OrderDetail orderDetail = orderDetailOptional.get();
			orderDetailDAO.delete(orderDetail);
            return ResponseEntity.ok().build();
		}else {
			return ResponseEntity.notFound().build();
		}
	}
	
//    @DeleteMapping("/order/{orderId}")
//    public void deleteOrderDetailsByOrderId(@PathVariable Integer orderId) {
//         orderDetailDAO.deleteByOrder_Id(orderId);
//         
//    }
    
    @DeleteMapping("/order/{orderId}")
	public ResponseEntity<Void> deleteOrderDetailsByOrderId(@PathVariable Integer orderId){
		OrderDetail oDetail = orderDetailDAO.findByOrder_Id(orderId);
		if(oDetail != null) {
			orderDetailDAO.delete(oDetail);
            return ResponseEntity.ok().build();
		}else {
			return ResponseEntity.notFound().build();
		}
	}
}
