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



@WebServlet("/DataFetch")
public class DataFetch extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	public DataFetch() {
        super();
    }
    
	
//Creating ArrayList of POJO Class.
	
    private ArrayList<invoice_fetch> fetchMyData(int start,int total){
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
			stmt = conn.createStatement();
			String sql = "SELECT cust_number,due_in_date,invoice_id,name_customer,total_open_amount,notes FROM `invoice_details` " //creating our sql query to execute.
					+ "limit "+(start-1)+","+total; 
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next()){
				invoice_fetch NewInvoice = new invoice_fetch();
				
				NewInvoice.setCust_number(rs.getString("cust_number"));
				NewInvoice.setDue_in_date(rs.getDate("due_in_date"));
				NewInvoice.setInvoice_id(rs.getLong("invoice_id"));
				NewInvoice.setName_customer(rs.getString("name_customer"));
				NewInvoice.setTotal_open_amount(rs.getDouble("total_open_amount"));
				System.out.println();
				
				if(rs.getString("notes")==null)  //this is for the notes section of our UI.
				NewInvoice.setNotes("Lorem Ipsum dolor sit amet");
				else
				NewInvoice.setNotes(rs.getString("notes"));
				dataList.add(NewInvoice);
			
			}
			rs.close();
			stmt.close();
			conn.close();
		}
		catch(SQLException se){
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
    
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out= response.getWriter();
		
		String stringPageId=request.getParameter("page");  
		int PageId=Integer.parseInt(stringPageId);
		
		//using a concept like pagination to send 15 values per fetch per page.
		int value=15;   
		if(PageId!=1) {
		    PageId=PageId-1;  
            PageId=PageId*value+1; 	   
		}
		
		//Converting to Json using Gson.
		
		Gson gson = new Gson();
		String data = gson.toJson(fetchMyData(PageId,value));
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		out.print(data);
		System.out.println(data);
		out.flush();
	}

}
