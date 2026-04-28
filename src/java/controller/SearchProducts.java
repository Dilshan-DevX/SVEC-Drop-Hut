/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.Brand;
import hibernate.Camara;
import hibernate.Color;
import hibernate.HibernateUtil;
import hibernate.Model;
import hibernate.Product;
import hibernate.Quality;
import hibernate.Status;

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
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author Dilhara
 */
@WebServlet(name = "SearchProducts", urlPatterns = {"/SearchProducts"})
public class SearchProducts extends HttpServlet {

    private static final int MAX_RESULT = 8;
    private static final int ACTIVE_ID = 2;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Gson gson = new Gson();
        JsonObject resposeObject = new JsonObject();
        resposeObject.addProperty("status", false);

        JsonObject requestJsonObject = gson.fromJson(request.getReader(), JsonObject.class);

        SessionFactory sf = HibernateUtil.getSessionFactory();
        Session s = sf.openSession();

        Criteria c1 = s.createCriteria(Product.class); // get all products for the filtering

//        if (requestJsonObject.has("brandName")) {
////            String brandId = requestJsonObject.get("brandName").getAsString();
//             int brandId = requestJsonObject.get("brandName").getAsInt();
//             System.out.println(brandId);
//            // get brand details 
//            Criteria c2 = s.createCriteria(Brand.class);
//            c2.add(Restrictions.eq("id", brandId));
//            Brand brand = (Brand) c2.uniqueResult();
//
//            // filter models by using brand details
//            Criteria c3 = s.createCriteria(Model.class);
//            c3.add(Restrictions.eq("brand", brand));
//            List<Model> modelList = c3.list();
//
//            // filter product by using modelList
//            c1.add(Restrictions.in("model", modelList));
//        }
//
//        if (requestJsonObject.has("conditionName")) {
////            String conditionid = requestJsonObject.get("conditionName").getAsString();
//            int conditionid = requestJsonObject.get("conditionName").getAsInt();
//            // get qulity details
//            Criteria c4 = s.createCriteria(Quality.class);
//            c4.add(Restrictions.eq("id", conditionid));
//            Quality quality = (Quality) c4.uniqueResult();
//
//            // filter product by using quality
//            c1.add(Restrictions.eq("quality", quality));
//        }
//
//        if (requestJsonObject.has("colorName")) {
////            String colorid = requestJsonObject.get("colorName").getAsString();
//               int colorid = requestJsonObject.get("colorName").getAsInt();
//            // get color details
//            Criteria c5 = s.createCriteria(Color.class);
//            c5.add(Restrictions.eq("id", colorid));
//            Color color = (Color) c5.uniqueResult();
//            // filter product by using color
//            c1.add(Restrictions.eq("color", color));
//        }
//
//        if (requestJsonObject.has("camaraValue")) {
////            String camaraValue = requestJsonObject.get("camaraValue").getAsString();
//            int camaraValue = requestJsonObject.get("camaraValue").getAsInt();
//            // get storage details
//            Criteria c6 = s.createCriteria(Camara.class);
//            c6.add(Restrictions.eq("id", camaraValue));
//            Camara camara = (Camara) c6.uniqueResult();
//            // filter product by using storage
//            c1.add(Restrictions.eq("camara", camara));
//        }

if (requestJsonObject.has("searchText")) {
  
    String searchText = requestJsonObject.get("searchText").getAsString().trim();
      System.out.println("SearchText: " + searchText);
    if (!searchText.isEmpty()) {
        c1.add(Restrictions.ilike("title", "%" + searchText + "%")); 
        // or search both title + description
        /*
        c1.add(
            Restrictions.or(
                Restrictions.ilike("title", "%" + searchText + "%"),
                Restrictions.ilike("description", "%" + searchText + "%")
            )
        );
        */
    }
}

// Brand filter
if (requestJsonObject.has("brandName")) {
    int brandId = requestJsonObject.get("brandName").getAsInt();
    if (brandId > 0) { // skip if All
        Criteria c2 = s.createCriteria(Brand.class);
        c2.add(Restrictions.eq("id", brandId));
        Brand brand = (Brand) c2.uniqueResult();

        Criteria c3 = s.createCriteria(Model.class);
        c3.add(Restrictions.eq("brand", brand));
        List<Model> modelList = c3.list();

        if (!modelList.isEmpty()) {
            c1.add(Restrictions.in("model", modelList));
        }
    }
}

// Condition filter
if (requestJsonObject.has("conditionName")) {
    int conditionId = requestJsonObject.get("conditionName").getAsInt();
    if (conditionId > 0) {
        Criteria c4 = s.createCriteria(Quality.class);
        c4.add(Restrictions.eq("id", conditionId));
        Quality quality = (Quality) c4.uniqueResult();
        if (quality != null) {
            c1.add(Restrictions.eq("quality", quality));
        }
    }
}

// Color filter
if (requestJsonObject.has("colorName")) {
    int colorId = requestJsonObject.get("colorName").getAsInt();
    if (colorId > 0) {
        Criteria c5 = s.createCriteria(Color.class);
        c5.add(Restrictions.eq("id", colorId));
        Color color = (Color) c5.uniqueResult();
        if (color != null) {
            c1.add(Restrictions.eq("color", color));
        }
    }
}

// Camera filter
if (requestJsonObject.has("camaraValue")) {
    int camaraValue = requestJsonObject.get("camaraValue").getAsInt();
    if (camaraValue > 0) {
        Criteria c6 = s.createCriteria(Camara.class);
        c6.add(Restrictions.eq("id", camaraValue));
        Camara camara = (Camara) c6.uniqueResult();
        if (camara != null) {
            c1.add(Restrictions.eq("camara", camara));
        }
    }
}


        

       

        Status status = (Status) s.get(Status.class, SearchProducts.ACTIVE_ID); // get Active product [2 = Active]
        c1.add(Restrictions.eq("status", status));

        resposeObject.addProperty("allProductCount", c1.list().size());

        if (requestJsonObject.has("firstResult")) {
            int firstResult = requestJsonObject.get("firstResult").getAsInt();
            c1.setFirstResult(firstResult);
            c1.setMaxResults(SearchProducts.MAX_RESULT);
        }

        // get filtered product list
        List<Product> productList = c1.list();
        for (Product product : productList) {
            product.setUser(null);
        }
        // hibernate session close
        s.close();

        resposeObject.add("productList", gson.toJsonTree(productList));
        resposeObject.addProperty("status", true);
        response.setContentType("application/json");
        String toJson = gson.toJson(resposeObject);
        response.getWriter().write(toJson);
    }

}
