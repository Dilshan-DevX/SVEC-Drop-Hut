/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.HibernateUtil;
import hibernate.Model;
import hibernate.Product;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.Util;
import org.hibernate.Criteria;
import org.hibernate.ObjectNotFoundException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;


@WebServlet(name = "LoadSingleProduct", urlPatterns = {"/LoadSingleProduct"})
public class LoadSingleProduct extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);
        String productId = request.getParameter("id");
//        System.out.println(productId);
        if (Util.isInteger(productId)) {
            SessionFactory sf = HibernateUtil.getSessionFactory();
            Session s = sf.openSession();
//            Product product = (Product) s.get(Product.class, Integer.valueOf(productId));
//            System.out.println(product);
            
            try {
                Product product = (Product) s.get(Product.class, Integer.valueOf(productId));
                if (product.getStatus().getValue().equals("Active")) {
                    product.getUser().setEmail(null);
                    product.getUser().setPassword(null);
                    product.getUser().setVerification_code(null);
                    product.getUser().setId(-1);
                    product.getUser().setCreated_at(null);

                  
                    responseObject.add("product", gson.toJsonTree(product));
//                    responseObject.add("productList", gson.toJsonTree(productList));
                    responseObject.addProperty("status", true);
                } else {
                    responseObject.addProperty("message", "Product Not Found!");
                }
            } catch (Exception e) {
                responseObject.addProperty("message", "Product Not Found!");
            }
        }

        response.setContentType("application/json");
        String toJson = gson.toJson(responseObject);
        response.getWriter().write(toJson);
    }

}
