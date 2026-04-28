
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.Cart;
import hibernate.HibernateUtil;
import hibernate.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;


@WebServlet(name = "RemoveCartItem", urlPatterns = {"/RemoveCartItem"})
public class RemoveCartItem extends HttpServlet {
   

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
        
        
        
        Gson gson = new Gson();
        JsonObject product = gson.fromJson(request.getReader(), JsonObject.class);
        
        int productId = Integer.parseInt(product.get("pid").getAsString());    

        System.out.println(productId);
        
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);
        
        User user = (User) request.getSession().getAttribute("user");
        
        if (user != null) { // DB cart
                
                SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
                Session s = sessionFactory.openSession();
     
                    Transaction tx = s.beginTransaction();

                    Criteria c = s.createCriteria(Cart.class);
                    c.add(Restrictions.eq("user", user));
                    c.add(Restrictions.eq("product.id", productId));
                    Cart cartItem = (Cart) c.uniqueResult();
                    if (cartItem != null) {
                        s.delete(cartItem);
                        tx.commit();
                        responseObject.addProperty("status", true);
                        responseObject.addProperty("message", "Item removed from cart");
                    } else {
                        responseObject.addProperty("message", "Item not found in cart");
                    }

////        try {
       
//            User user = (User) request.getSession().getAttribute("user");
//            
////            if (user != null) { // DB cart
//                
//                SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
//                Session s = sessionFactory.openSession();
//     
//                    Transaction tx = s.beginTransaction();
//
//                    Criteria c = s.createCriteria(Cart.class);
//                    c.add(Restrictions.eq("user", user));
//                    c.add(Restrictions.eq("product.id", productId));
//                    Cart cartItem = (Cart) c.uniqueResult();
//                    if (cartItem != null) {
//                        s.delete(cartItem);
//                        tx.commit();
//                        responseObject.addProperty("status", true);
//                        responseObject.addProperty("message", "Item removed from cart");
//                    } else {
//                        responseObject.addProperty("message", "Item not found in cart");
//                    }
//                
////            } else { // session cart
////                ArrayList<Cart> sessionCart = (ArrayList<Cart>) request.getSession().getAttribute("sessionCart");
////                if (sessionCart != null) {
////                    sessionCart.removeIf(c -> c.getProduct().getId() == productId);
////                    request.getSession().setAttribute("sessionCart", sessionCart);
////                }
////                responseObject.addProperty("status", true);
////                responseObject.addProperty("message", "Item removed from cart");
////            }
////
////        } catch (Exception e) {
////            e.printStackTrace();
////            
////            responseObject.addProperty("message", "Error removing item from cart");
////        }
        }
            String resptext = gson.toJson(responseObject);
            response.setContentType("application/json");
            response.getWriter().write(resptext);
       
       
   }

}
