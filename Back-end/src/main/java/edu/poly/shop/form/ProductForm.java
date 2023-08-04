package edu.poly.shop.form;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductForm {
	String name;
	double price;
	String information;
	MultipartFile image;
	int category;
}
