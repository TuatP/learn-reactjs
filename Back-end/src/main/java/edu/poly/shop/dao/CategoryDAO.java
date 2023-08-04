package edu.poly.shop.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.poly.shop.entity.Category;

@Repository
public interface CategoryDAO extends JpaRepository<Category, Integer>{
	Category findByCategoryId(Integer id);
}
