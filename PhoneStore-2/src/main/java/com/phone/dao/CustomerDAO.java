package com.phone.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.phone.entity.Customer;


@Repository
public interface CustomerDAO extends JpaRepository<Customer, String>{
	Customer findByUsername(String username);

}
