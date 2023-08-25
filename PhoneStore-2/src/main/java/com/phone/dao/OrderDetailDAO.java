package com.phone.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.phone.entity.Category;
import com.phone.entity.OrderDetail;

import jakarta.transaction.Transactional;

@Repository
public interface OrderDetailDAO extends JpaRepository<OrderDetail, Integer>{
	
	@Query("SELECT od FROM OrderDetail od JOIN od.order o JOIN o.customer c where c.username = :username")
	List<OrderDetail> findByCustomerUsername(@Param("username") String username);
	
    void deleteByOrder_Id(Integer orderId);
    OrderDetail findByOrder_Id(Integer orderId);
    
    List<OrderDetail> findByOrderId(Integer orderId);

	
}
