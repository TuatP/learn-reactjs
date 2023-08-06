package edu.poly.shop.entity;




import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(name = "Products")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	String name;
	double price;
	@Column(columnDefinition = "int default 0")
	int quantity;
	@Column(columnDefinition = "double default 0")
	double discount;
	@Column(columnDefinition = "nvarchar(1000) not null")
	String information;
	@Column(columnDefinition = "nvarchar(3000) not null default '' ")
	String using;

	String imageName;
	
	@ManyToOne
	@JoinColumn(name = "Categoryid")
	Category category;
	
	@JsonIgnore
	@OneToMany(mappedBy = "product")
	List<OrderDetail> orderDetails;
	
	

}
 