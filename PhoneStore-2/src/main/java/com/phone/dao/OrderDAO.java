package com.phone.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.phone.entity.Customer;
import com.phone.entity.Order;

import jakarta.transaction.Transactional;


@Repository
public interface OrderDAO extends JpaRepository<Order, Integer>{
	List<Order> findAllByOrderByIdDesc();
	
	@Modifying
	@Transactional
    @Query("UPDATE Order o SET o.isConfirm = true WHERE o.id = :orderId")
    void confirmOrder(Integer orderId);
	
	//thong ke
	@Query("SELECT o.customer, count(o) as orderCount from Order o Group by o.customer order by orderCount DESC")
	List<Object[]> findTop5CustomerByOrderCount();
	
}
