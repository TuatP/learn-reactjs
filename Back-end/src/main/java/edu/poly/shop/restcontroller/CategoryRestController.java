package edu.poly.shop.restcontroller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.poly.shop.dao.CategoryDAO;
import edu.poly.shop.entity.Category;

@RestController
@CrossOrigin
@RequestMapping("/api/categories")
public class CategoryRestController {

	@Autowired
	CategoryDAO categoryDAO;

	@PostMapping("")
	public ResponseEntity<Category> addCategory(@RequestBody Category category) {
		categoryDAO.save(category);
		return ResponseEntity.ok(category);

	}

	@GetMapping("/list")
	public List<Category> listCategory() {
		return categoryDAO.findAll();
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteCategory(@PathVariable Integer id){
		Category category = categoryDAO.findByCategoryId(id);
		if(category != null) {
			categoryDAO.delete(category);
            return ResponseEntity.ok().build();
		}else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Category> getOne (@PathVariable("id") Integer id){
		if(!categoryDAO.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(categoryDAO.findById(id).get());
	}
	
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable("id") Integer id, @RequestBody Category updatedCategory) {
		Category category = categoryDAO.findByCategoryId(id);

        category.setName(updatedCategory.getName());

        Category updated = categoryDAO.save(category);
        return ResponseEntity.ok(updated);
    }
	
	
	

}
