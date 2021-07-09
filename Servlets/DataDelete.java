package Servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/DataDelete")
public class DataDelete extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
 
    public DataDelete() {
        super();
    }
    
    
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out= response.getWriter();
		
		String invId = request.getParameter("invoice");
		System.out.println(invId);
		String[] invoices=invId.split(",");
		DeleteData(invoices);
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		System.out.println("Succesfully Deleted");
		out.flush();
	}

	
	private void DeleteData(String[] invIds) {
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
			for(String id:invIds) {	
			String sql= "DELETE FROM `invoice_details` WHERE invoice_id="+id+";"; //SQL query to delete.
			
			stmt.executeUpdate(sql);
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
