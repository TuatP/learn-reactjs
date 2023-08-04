package edu.poly.shop.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.poly.shop.entity.Customer;

@Repository
public interface CustomerDAO extends JpaRepository<Customer, String>{
	Customer findByUsername(String username);

}
