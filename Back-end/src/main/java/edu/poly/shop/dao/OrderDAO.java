package edu.poly.shop.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.poly.shop.entity.Order;

@Repository
public interface OrderDAO extends JpaRepository<Order, Integer>{

}
