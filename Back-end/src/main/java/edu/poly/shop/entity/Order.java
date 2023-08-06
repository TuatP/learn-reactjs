package edu.poly.shop.entity;


import java.util.Date;
import java.util.List;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Orders")
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	@Temporal(TemporalType.DATE)
	@Column(name = "CreateDate")
	Date createDate = new Date();
	
	@ManyToOne
	@JoinColumn(name = "Username")
	Customer customer;
	
	@Column(columnDefinition = "nvarchar(1000) not null default '' ")
	String address;
	
	@JsonIgnore
	@OneToMany(mappedBy = "order")
	List<OrderDetail> orderDetails;
	
	
	
	

}
