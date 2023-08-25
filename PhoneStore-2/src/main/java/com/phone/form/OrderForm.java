package com.phone.form;

public class OrderForm {
	String username;
	String address;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public OrderForm(String username, String address) {
		super();
		this.username = username;
		this.address = address;
	}
	public OrderForm() {
		super();
	}
	

}
