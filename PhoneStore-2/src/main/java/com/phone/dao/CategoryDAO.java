package com.phone.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.phone.entity.Category;


@Repository
public interface CategoryDAO extends JpaRepository<Category, Integer>{
	Category findByCategoryId(Integer id);
}
