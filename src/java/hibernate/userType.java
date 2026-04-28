
package hibernate;

import javax.persistence.Column;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Table(name = "userType")

public class  userType {
    
    @id
    @Column(name = "user")           
    String user;
    
    @Column(name = "name")           
    String name; 
    
    @OneToMany
    @Column(name = "u_id")
    String userType_id;
    

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserType_id() {
        return userType_id;
    }

    public void setUserType_id(String userType_id) {
        this.userType_id = userType_id;
    }
    
}
