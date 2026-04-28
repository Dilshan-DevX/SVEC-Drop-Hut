package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.Mail;
import model.Util;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;


@WebServlet(name = "SignUp", urlPatterns = {"/SignUp"})
public class SignUp extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
//        System.out.println("OK");  
        
        Gson gson = new Gson();
        JsonObject user = gson.fromJson(request.getReader(), JsonObject.class);

        String name = user.get("name").getAsString();
        final String email = user.get("email").getAsString();
        String mobile = user.get("mobile").getAsString();
        String password = user.get("password").getAsString();
        
//        System.out.println(name);
//        System.out.println(email);
//        System.out.println(mobile);
//        System.out.println(password);

        //validation
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        if (name.isEmpty()) {
            responseObject.addProperty("message", "Name Can not be empty!");
        }else if(email.isEmpty()){
            responseObject.addProperty("message", "Email Can not be empty!");
        }else if(!Util.isEmailvalid(email)){
            responseObject.addProperty("message", "Email is Not Valid!");
        }else if(mobile.isEmpty()){
            responseObject.addProperty("message", "Mobile Can not be empty!");
        }else if(!Util.isMobilevalid(mobile)){
            responseObject.addProperty("message", "Mobile is Not Valid!");
        }else if(password.isEmpty()){
            responseObject.addProperty("message", "Password Can not be empty!");
        }else if(!Util.isPasswordvalid(password)){
            responseObject.addProperty("message", "Password Is Not Valid!");
        } else{

            SessionFactory sf = hibernate.HibernateUtil.getSessionFactory();
            Session s = sf.openSession();
            
            Criteria criteria = s.createCriteria(User.class);
            criteria.add(Restrictions.eq("email", email));
            
            if (!criteria.list().isEmpty()) {
                responseObject.addProperty("message", "User With this Email already exists!");
            }else{
                
            User u = new User();
            u.setName(name);
            u.setEmail(email);
            u.setMobile(mobile);
            u.setPassword(password);
            
            final String vc = Util.generateCode();
            u.setVerification_code(vc);
            
            u.setCreated_at(new Date());

            

            s.save(u);
            s.beginTransaction().commit();
            
            new Thread(new Runnable() {
                @Override
                public void run() {
                    Mail.sendMail(email, "Drophut Code", "<h1>" + vc + "</h1>");
                }
            }).start(); 
            
            //session-management
            HttpSession ses = request.getSession();
            ses.setAttribute("email", email);
            //session-management-end
            responseObject.addProperty("status", true);
            responseObject.addProperty("message", "Registration Success.Please check youer email for the verfication code");
            
            }
            s.close();
            
            
       
    }  
        
            String resptext = gson.toJson(responseObject);
            response.setContentType("application/json");
            response.getWriter().write(resptext);
                    

    }

}
