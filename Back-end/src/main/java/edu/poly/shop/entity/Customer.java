package edu.poly.shop.entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
@Table(name = "Customers")
public class Customer {
	@Id
	@Column(length = 30)
	 String username;
	@Column(length = 60 , nullable = false)
	 String password;
	@Column(columnDefinition = "nvarchar(50) not null")
	 String name;
	@Column(columnDefinition = "nvarchar(100) not null ")
	 String email;
	@Column(length = 20)
	 String phone;
	@Temporal(TemporalType.DATE)
	 Date registeredDate = new Date();
	
	@JsonIgnore
	@OneToMany(mappedBy = "customer")
	List<Order> orders;
	
	
	

}
