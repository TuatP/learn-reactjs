package com.phone.form;

public class VPNForm {
	private Integer amount;
	  private String vnpOrderInfo;
	  private String vnpBankCode;
	  private String vnpTxnRef;
	  private String txtBillingMobile;
	  private String txtBillingEmail;
	  private String txtBillingFullname;
	  private String vnpReturnUrl;
	  private String vnpResponseCode;  // check response code: vnp_ResponseCode == 0 => success
	public Integer getAmount() {
		return amount;
	}
	public void setAmount(Integer amount) {
		this.amount = amount;
	}
	public String getVnpOrderInfo() {
		return vnpOrderInfo;
	}
	public void setVnpOrderInfo(String vnpOrderInfo) {
		this.vnpOrderInfo = vnpOrderInfo;
	}
	public String getVnpBankCode() {
		return vnpBankCode;
	}
	public void setVnpBankCode(String vnpBankCode) {
		this.vnpBankCode = vnpBankCode;
	}
	public String getVnpTxnRef() {
		return vnpTxnRef;
	}
	public void setVnpTxnRef(String vnpTxnRef) {
		this.vnpTxnRef = vnpTxnRef;
	}
	public String getTxtBillingMobile() {
		return txtBillingMobile;
	}
	public void setTxtBillingMobile(String txtBillingMobile) {
		this.txtBillingMobile = txtBillingMobile;
	}
	public String getTxtBillingEmail() {
		return txtBillingEmail;
	}
	public void setTxtBillingEmail(String txtBillingEmail) {
		this.txtBillingEmail = txtBillingEmail;
	}
	public String getTxtBillingFullname() {
		return txtBillingFullname;
	}
	public void setTxtBillingFullname(String txtBillingFullname) {
		this.txtBillingFullname = txtBillingFullname;
	}
	public String getVnpReturnUrl() {
		return vnpReturnUrl;
	}
	public void setVnpReturnUrl(String vnpReturnUrl) {
		this.vnpReturnUrl = vnpReturnUrl;
	}
	public String getVnpResponseCode() {
		return vnpResponseCode;
	}
	public void setVnpResponseCode(String vnpResponseCode) {
		this.vnpResponseCode = vnpResponseCode;
	}
	public VPNForm(Integer amount, String vnpOrderInfo, String vnpBankCode, String vnpTxnRef, String txtBillingMobile,
			String txtBillingEmail, String txtBillingFullname, String vnpReturnUrl, String vnpResponseCode) {
		super();
		this.amount = amount;
		this.vnpOrderInfo = vnpOrderInfo;
		this.vnpBankCode = vnpBankCode;
		this.vnpTxnRef = vnpTxnRef;
		this.txtBillingMobile = txtBillingMobile;
		this.txtBillingEmail = txtBillingEmail;
		this.txtBillingFullname = txtBillingFullname;
		this.vnpReturnUrl = vnpReturnUrl;
		this.vnpResponseCode = vnpResponseCode;
	}
	public VPNForm() {
		super();
	}

}
