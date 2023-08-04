package edu.poly.shop.restcontroller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import edu.poly.shop.dao.ProductDAO;
import edu.poly.shop.entity.Category;
import edu.poly.shop.entity.Product;

@RestController
@CrossOrigin
@RequestMapping("api/products")
public class ProductRestController {
	
	@Autowired
	ProductDAO productDAO;
	
	@GetMapping("/list")
	public List<Product> getList(){
		return productDAO.findAll();
	}
	
	@PostMapping("")
	public ResponseEntity<Product> addProduct(@ModelAttribute Product product, @RequestParam("imageFile") MultipartFile imageFile) {
			productDAO.save(product);
		
		try {
	        // Lưu thông tin sản phẩm vào cơ sở dữ liệu
	        Product savedProduct = productDAO.save(product);
	        
	        // Lưu dữ liệu hình ảnh vào thư mục (hoặc cơ sở dữ liệu)
	        if (!imageFile.isEmpty()) {
	            String uploadDir = "src/main/resources/static/images";
	            String fileName = imageFile.getOriginalFilename();
	            Path filePath = Paths.get(uploadDir, fileName);
	            Files.write(filePath, imageFile.getBytes());

	            // Lưu tên tệp hình ảnh vào thuộc tính 'imageName'
	            savedProduct.setImageName(fileName);
	            productDAO.save(savedProduct);
	        }

	        return ResponseEntity.ok(savedProduct);
	    } catch (IOException e) {
	        return ResponseEntity.badRequest().build();
	    }	
		}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteProduct(@PathVariable Integer id){
		if(!productDAO.existsById(id)) {
            return ResponseEntity.notFound().build();
		}else {
			productDAO.deleteById(id);
			return ResponseEntity.ok().build();
		}
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Product> getOne (@PathVariable("id") Integer id){
		if(!productDAO.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(productDAO.findById(id).get());
	}
	
	@GetMapping(path = "/get-image/{imageName}")
	public ResponseEntity<ByteArrayResource> getImage(@PathVariable("imageName") String imageName) {
		if (imageName != null || "".equals(imageName)) {
			Path fileName = Paths.get("src/main/resources/static/images", imageName);
			try {
				byte[] buffer = Files.readAllBytes(fileName);
				ByteArrayResource bytes = new ByteArrayResource(buffer);
				return ResponseEntity.ok().contentLength(buffer.length)
						.contentType(MediaType.parseMediaType("image/png")).body(bytes);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return ResponseEntity.badRequest().build();
	}
}
