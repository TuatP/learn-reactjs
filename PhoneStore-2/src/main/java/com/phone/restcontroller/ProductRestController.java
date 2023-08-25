package com.phone.restcontroller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.phone.dao.ProductDAO;
import com.phone.entity.Category;
import com.phone.entity.Product;
import com.phone.ultis.RandomString;



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
		String randomString = RandomString.generateRandomString();
		try {
	        // Lưu thông tin sản phẩm vào cơ sở dữ liệu
	        Product savedProduct = productDAO.save(product);
	        
	        // Lưu dữ liệu hình ảnh vào thư mục (hoặc cơ sở dữ liệu)
	        if (!imageFile.isEmpty()) {
	            String uploadDir = "src/main/resources/static/images";
	            String fileName = imageFile.getOriginalFilename();
	            String fileNameRandom = randomString.concat(fileName);
	            Path filePath = Paths.get(uploadDir, fileNameRandom);
	            Files.write(filePath, imageFile.getBytes());

	            // Lưu tên tệp hình ảnh vào thuộc tính 'imageName'
	            savedProduct.setImageName(fileNameRandom);
	            productDAO.save(savedProduct);
	        }

	        return ResponseEntity.ok(savedProduct);
	    } catch (IOException e) {
	        return ResponseEntity.badRequest().build();
	    }	
		}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteProduct(@PathVariable Integer id){
		
		
	    Optional<Product> productOptional = productDAO.findById(id);

	    if (!productOptional.isPresent()) {
	        return ResponseEntity.notFound().build();
	    }
	    Product product = productOptional.get();
	    String imageName = product.getImageName();

		productDAO.deleteById(id);
		
		   try {
		        Files.delete(Paths.get("src/main/resources/static/images", imageName));
		    } catch (IOException e) {
		        e.printStackTrace();
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		    }
		
		return ResponseEntity.ok().build();
		
	}
	
	@GetMapping("/get/{id}")
	public ResponseEntity<Product> getOne (@PathVariable("id") Integer id){
		if(!productDAO.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(productDAO.findById(id).get());
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @ModelAttribute Product product, @RequestParam(name ="imageFile",required = false) MultipartFile imageFile) {
	    try {
	        // Kiểm tra xem sản phẩm có tồn tại hay không
	        if (!productDAO.existsById(id)) {
	            return ResponseEntity.notFound().build();
	        }
	        // Lấy thông tin sản phẩm hiện tại từ cơ sở dữ liệu
	        Product existingProduct = productDAO.findById(id).get();
	        
	        // Cập nhật thông tin sản phẩm với dữ liệu mới
	        existingProduct.setName(product.getName());
	        existingProduct.setPrice(product.getPrice());
	        existingProduct.setQuantity(product.getQuantity());
	        existingProduct.setDiscount(product.getDiscount());
	        existingProduct.setInformation(product.getInformation());
	        existingProduct.setUsing(product.getUsing());
	        
	        // Các thuộc tính khác cần cập nhật
	        
	        // Lưu dữ liệu hình ảnh vào thư mục (hoặc cơ sở dữ liệu)
	        if (imageFile != null) {
	            String uploadDir = "src/main/resources/static/images";
	            String fileName = imageFile.getOriginalFilename();
	            String fileNameRandom = RandomString.generateRandomString() + fileName;
	            Path filePath = Paths.get(uploadDir, fileNameRandom);
	            Files.write(filePath, imageFile.getBytes());

	            // Lưu tên tệp hình ảnh vào thuộc tính 'imageName'
	            existingProduct.setImageName(fileNameRandom);
	        }else {
	        	existingProduct.setImageName(existingProduct.getImageName());
	        }

	        // Lưu sản phẩm đã cập nhật vào cơ sở dữ liệu
	        Product updatedProduct = productDAO.save(existingProduct);

	        return ResponseEntity.ok(updatedProduct);
	    } catch (IOException e) {
	        return ResponseEntity.badRequest().build();
	    }
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
	
	@GetMapping("page")
	public Page<Product> getAllByPage(
			@RequestParam("page") Optional<Integer> page,
			@RequestParam("size") Optional<Integer> size
			){
		Integer currentPage = page.orElse(1);
		Integer pageSize = size.orElse(5);
		
		Pageable pageAble = PageRequest.of(currentPage, pageSize);
		
		return productDAO.findAll(pageAble);
	}
}
