package com.farmers.service.services;


import com.farmers.service.dao.UserDAO;
import com.farmers.service.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    @Autowired
    UserDAO userDAO;
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<User> user = userDAO.findUserByUserName(userName);
        if(user.isPresent()) {
            User _user = user.get();
            return  new org.springframework.security.core.userdetails.User(_user.getUserName(), _user.getPassword(), new ArrayList<>());
        }
        return null;
    }
}
