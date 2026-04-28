package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.Address;
import hibernate.HibernateUtil;
import hibernate.Orders;
import hibernate.Product;
import hibernate.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
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

@WebServlet(name = "userDelete", urlPatterns = {"/userDelete"})
public class userDelete extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Gson gson = new Gson();
        JsonObject user = gson.fromJson(req.getReader(), JsonObject.class);
      

        Integer userId = user.get("userId").getAsInt();

        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        SessionFactory factory = HibernateUtil.getSessionFactory();
        Session session = factory.openSession();
        
//        Criteria c1 = session.createCriteria(Product.class);
//        c1.add(Restrictions.eq("user_id", userId));
//        List<Product> productList = c1.list();
//        
//        System.out.println(productList);
        
        
        Transaction tx = null;

        try {
            tx = session.beginTransaction();

            // Step 1: Delete addresses
            session.createQuery("DELETE FROM Address WHERE user.id = :userId")
                    .setParameter("userId", userId)
                    .executeUpdate();

            // Step 2: Delete addresses
            session.createQuery("DELETE FROM Cart WHERE user.id = :userId")
                    .setParameter("userId", userId)
                    .executeUpdate();
            
            
            // Step 2: Delete orders
            session.createQuery("DELETE FROM Orders WHERE user.id = :userId")
                    .setParameter("userId", userId)
                    .executeUpdate();

            // Step 3: Delete products
            session.createQuery("DELETE FROM Product WHERE user.id = :userId")
                    .setParameter("userId", userId)
                    .executeUpdate();

            // Step 4: Delete the user
            session.createQuery("DELETE FROM User WHERE id = :userId")
                    .setParameter("userId", userId)
                    .executeUpdate();
            
             // Step 4: Delete the user
     

            tx.commit();
            resp.getWriter().write("User deleted successfully.");

            responseObject.addProperty("status", true);

            String responseText = gson.toJson(responseObject);
            resp.setContentType("application/json");
            resp.getWriter().write(responseText);

        } catch (Exception e) {
            if (tx != null) {
                tx.rollback();
            }
            e.printStackTrace();
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error deleting user");
        } finally {
            session.close();
        }
    }
}