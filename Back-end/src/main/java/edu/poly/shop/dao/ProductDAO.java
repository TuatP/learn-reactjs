package edu.poly.shop.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import edu.poly.shop.entity.Product;

@Repository
public interface ProductDAO extends JpaRepository<Product, Integer>{

}
