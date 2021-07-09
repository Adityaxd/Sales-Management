package Servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;




@WebServlet("/DataAdd")
public class DataAdd extends HttpServlet {
	private static final long serialVersionUID = 1L;
  
    public DataAdd() {
        super();
     
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		PrintWriter out = response.getWriter(); //object of response to send.
		String Name = request.getParameter("name");
		Date date=null;
		SimpleDateFormat formatter = new SimpleDateFormat("EEE MMM dd yyyy HH:mm:ss zzz", Locale.ENGLISH);
		try {
			date = formatter.parse(request.getParameter("date"));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		String invId = request.getParameter("invoice");
		String CustNum = request.getParameter("custNum");
		String Amount = request.getParameter("amount");
		String notes = request.getParameter("notes");
		String docId=invId;
		AddData(Name,date,invId,CustNum,Amount,notes,docId);
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		System.out.println("Succesfully Inserted");
		out.flush();
	}

	
	private void AddData(String Name, Date date,String invId,String CustNum,String Amount,String notes,String docId) {
		
		final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    	final String DB_URL = "jdbc:mysql://localhost/h2h_internship";
    	final String USER = "root";
    	final String PASS = "root";
    	
    	Connection conn = null;
		java.sql.Statement stmt = null;
		
		//Writing our SQL Query.
		
		String sql = "INSERT INTO invoice_details (name_customer,"
				+ "due_in_date,invoice_id,total_open_amount,cust_number,notes,doc_id)"
				+ "values (?,?,?,?,?,?,?)";
		
		try{
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL,USER,PASS);
			conn.setAutoCommit(true);
			stmt = conn.createStatement();
			PreparedStatement statement = conn.prepareStatement(sql);
				
				//Setting our statements into our SQL query to be executed.
			
				statement.setString(1,Name);  
				statement.setString(2, change_date(date));
				statement.setLong(3, Long.parseLong(invId));
				statement.setLong(7, Long.parseLong(docId));
				statement.setDouble(4, Double.parseDouble(Amount));
				statement.setInt(5, Integer.parseInt(CustNum));
				statement.setString(6, notes);
				statement.execute();
				
				System.out.println(statement);
				
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
	
	
	@SuppressWarnings("deprecation")
	private static String change_date(Date date){
	    String Finaldate = "";
	    Finaldate += (date.getYear()+1900);  
		String month = Integer.toString(date.getMonth()+1);
	    if(month.length() == 1)
	        Finaldate += "0";
	    Finaldate += month;
	    String day = Integer.toString(date.getDate());
	    if(day.length()==1)
	        Finaldate += "0";
	    Finaldate += day;
	    return Finaldate;
	}


	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response); 
	}

}
