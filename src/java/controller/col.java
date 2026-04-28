/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;



import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import hibernate.Color;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

/**
 *
 * @author ADMIN
 */
@WebServlet(name = "col", urlPatterns = {"/col"})
public class col extends HttpServlet {

    
  

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        
        SessionFactory sf = hibernate.HibernateUtil.getSessionFactory();
        Session s = sf.openSession();
        
        Color color = new Color();
       
        color.setValue("efsef");
        
        s.save(color);
        s.beginTransaction().commit();
        
    

        Color c = new Color();
        c.setId(8);
        
        s.delete(c);
        s.beginTransaction().commit();
        
        System.out.println("color deleted!");
        
    }
    
    
 

}
