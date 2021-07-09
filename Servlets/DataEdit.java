package Servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/DataEdit")
public class DataEdit extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
 
    public DataEdit() {
        super();
    }
    
    
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out= response.getWriter();
		
		String invId = request.getParameter("invoice");
		System.out.println(invId);
		String[] invoices=invId.split(",");    
		String Amount = request.getParameter("amount");
		String notes = request.getParameter("notes");
		System.out.println(invoices[0]+Amount+notes);
		EditData(invoices,Amount,notes);
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		System.out.println("Succesfully Editted");
		out.flush();
	}

	
	private void EditData(String[] invIds, String amount, String notes) {
		final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    	final String DB_URL = "jdbc:mysql://localhost/h2h_internship";
    	final String USER = "root";
    	final String PASS = "root";
    	
    	Connection conn = null;
		java.sql.Statement stmt = null;
			try{
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL,USER,PASS);
			conn.setAutoCommit(true);
			stmt = conn.createStatement();
			String sql = "UPDATE `invoice_details` SET total_open_amount= ?," //sql query to update our document.
					+ "notes= ? WHERE invoice_id = ?";   
			PreparedStatement statement = conn.prepareStatement(sql);
			for(String id:invIds) {	
			if(notes.isEmpty())
			notes="";
			
			//setting our data to our query. 
			
			statement.setLong(3, Long.parseLong(id));
			statement.setDouble(1, Double.parseDouble(amount));
			statement.setString(2, notes);
	
			System.out.println(sql);
			statement.executeUpdate();
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
		
	}



	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
