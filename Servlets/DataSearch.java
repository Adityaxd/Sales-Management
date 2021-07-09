package Servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

@WebServlet("/DataSearch")
public class DataSearch extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
    public DataSearch() {
        super();
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out= response.getWriter();
		
		
		String stringPageId="1";  // used to limit the data's to only top 15 values, which we have passed for the search bar field.
		
		int PageId=Integer.parseInt(stringPageId);
		
		int value=15;   
		
		if(PageId!=1) {
		    PageId=PageId-1;  
            PageId=PageId*value+1; 	   
		}
		
		String invId = request.getParameter("invoice");
		Gson gson = new Gson();
		String data = gson.toJson(SearchData(invId,PageId,value));
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		out.print(data);
		System.out.println(data);
		out.flush();
		
	}

	
	private ArrayList<invoice_fetch> SearchData(String invId,int start,int total) {
		
		final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    	final String DB_URL = "jdbc:mysql://localhost/h2h_internship";
    	final String USER = "root";
    	final String PASS = "root";
    	
    	ArrayList<invoice_fetch> dataList = new ArrayList<invoice_fetch>();
    	Connection conn = null;
		java.sql.Statement stmt = null;
			try{
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL,USER,PASS);
			conn.setAutoCommit(true);  
			stmt = conn.createStatement();
						
			String sql= "Select * from `invoice_details`" + 
					"where invoice_id like '"+invId+"%' limit "+(start-1)+","+total+";";  //SQL query for search.
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next()){
			invoice_fetch NewInvoice = new invoice_fetch();
			NewInvoice.setCust_number(rs.getString("cust_number"));
			NewInvoice.setDue_in_date(rs.getDate("due_in_date"));
			NewInvoice.setInvoice_id(rs.getLong("invoice_id"));
			NewInvoice.setName_customer(rs.getString("name_customer"));
			NewInvoice.setTotal_open_amount(rs.getDouble("total_open_amount"));
			System.out.println();
			
			if(rs.getString("notes")==null)
			NewInvoice.setNotes("Lorem Ipsum dolor...");
			else
			NewInvoice.setNotes(rs.getString("notes"));
			dataList.add(NewInvoice);
			}
				stmt.close();
				conn.close();
		}catch(SQLException se){
			se.printStackTrace();
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			try{
			if(stmt!=null)
			stmt.close();
			}catch(SQLException se2){
			}
			try{
			if(conn!=null)
			conn.close();
		}catch(SQLException se){
			se.printStackTrace();
			}
		}
		return dataList;
		
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doGet(request, response);
	}

}
