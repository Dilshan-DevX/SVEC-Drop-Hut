package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.HibernateUtil;
import hibernate.User;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "verifyAccount", urlPatterns = {"/verifyAccount"})
public class verifyAccount extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Gson gson = new Gson();

//        JsonObject verification = gson.fromJson(request.getReader(), JsonObject.class);
//        String verificationCode = verification.get("verificationCode").getAsString();
//           System.out.println(verificationCode);
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        HttpSession ses = request.getSession();
        if (ses.getAttribute("email") == null) {
//            responseObject.addProperty("message", "Email not found!");
            responseObject.addProperty("message", "1");
        } else {
            String email = ses.getAttribute("email").toString();

            JsonObject verification = gson.fromJson(request.getReader(), JsonObject.class);
            String verificationCode = verification.get("verificationCode").getAsString();

            SessionFactory sf = HibernateUtil.getSessionFactory();
            Session s = sf.openSession();
            Criteria c1 = s.createCriteria(User.class);
            Criterion crt1 = Restrictions.eq("email", email);
            Criterion crt2 = Restrictions.eq("verification_code", verificationCode);

            c1.add(crt1);
            c1.add(crt2);

            if (c1.list().isEmpty()) {
                responseObject.addProperty("message", "Invalid verification code!");
            } else {
                User u1 = (User) c1.list().get(0);
                u1.setVerification_code("Verified");
                s.update(u1);
                s.beginTransaction().commit();

                // store user in session
                ses.setAttribute("user", u1);
                // store user in session end

                responseObject.addProperty("status", true);
                responseObject.addProperty("message", "Verification successfull");
            }
            s.close();
        }
        String toJson = gson.toJson(responseObject);
        response.setContentType("application/json");
        response.getWriter().write(toJson);
    }

}
