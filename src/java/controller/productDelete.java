package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.Cart;
import hibernate.HibernateUtil;
import hibernate.OrderItems;
import hibernate.Product;
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

@WebServlet(name = "productDelete", urlPatterns = {"/productDelete"})
public class productDelete extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject products = gson.fromJson(req.getReader(), JsonObject.class);

        Integer productId = products.get("productId").getAsInt();

        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        SessionFactory factory = HibernateUtil.getSessionFactory();
        Session session = factory.openSession();
        Transaction tx = null;

        try {
            tx = session.beginTransaction();

            Criteria c1 = session.createCriteria(Cart.class);
            c1.add(Restrictions.eq("product.id", productId));
            List<Cart> cart = c1.list();

            Criteria c2 = session.createCriteria(OrderItems.class);
            c2.add(Restrictions.eq("product.id", productId));
            List<OrderItems> orderItem = c2.list();

            if (!cart.isEmpty()) {

                // Step 1: Delete addresses
                session.createQuery("DELETE FROM Cart WHERE product.id = :productId")
                        .setParameter("productId", productId)
                        .executeUpdate();

            } else if (!orderItem.isEmpty()) {

                // Step 2: Delete addresses
                session.createQuery("DELETE FROM OrderItems WHERE product.id = :productId")
                        .setParameter("productId", productId)
                        .executeUpdate();

            } else {

                // Step 2: Delete orders
                session.createQuery("DELETE FROM Product WHERE id = :productId")
                        .setParameter("productId", productId)
                        .executeUpdate();

            }

            tx.commit();
            resp.getWriter().write("Product deleted successfully.");

            responseObject.addProperty("status", true);

            String responseText = gson.toJson(responseObject);
            resp.setContentType("application/json");
            resp.getWriter().write(responseText);

        } catch (Exception e) {
            if (tx != null) {
                tx.rollback();
            }
            e.printStackTrace();
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error deleting product");
        } finally {
            session.close();
        }
    }
}