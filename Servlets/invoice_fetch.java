package Servlets;
import java.util.*;

public class invoice_fetch {
	String cust_number=null;
	String name_customer=null;
	Date due_in_date=null;
	double total_open_amount;
	Long invoice_id=null;
	String notes=null;
	
	
	
	public invoice_fetch() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	public invoice_fetch(String cust_number, String name_customer, Date due_in_date, double total_open_amount,
		Long invoice_id, String notes) {
		super();
		this.cust_number = cust_number;
		this.name_customer = name_customer;
		this.due_in_date = due_in_date;
		this.total_open_amount = total_open_amount;
		this.invoice_id = invoice_id;
		this.notes = notes;
	}


	public String getCust_number() {
		return cust_number;
	}
	public void setCust_number(String cust_number) {
		this.cust_number = cust_number;
	}
	public String getName_customer() {
		return name_customer;
	}
	public void setName_customer(String name_customer) {
		this.name_customer = name_customer;
	}
	public Date getDue_in_date() {
		return due_in_date;
	}
	public void setDue_in_date(Date due_in_date) {
		this.due_in_date = due_in_date;
	}
	public double getTotal_open_amount() {
		return total_open_amount;
	}
	public void setTotal_open_amount(double total_open_amount) {
		this.total_open_amount = total_open_amount;
	}
	public Long getInvoice_id() {
		return invoice_id;
	}
	public void setInvoice_id(Long invoice_id) {
		this.invoice_id = invoice_id;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
}
