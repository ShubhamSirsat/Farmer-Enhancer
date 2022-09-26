package com.farmers.service.controllers;

import com.farmers.service.dao.FeedbackDAO;
import com.farmers.service.dao.ProductDAO;
import com.farmers.service.dao.UserDAO;
import com.farmers.service.dto.BasicResponseDTO;
import com.farmers.service.dto.FeedbackRequestDTO;
import com.farmers.service.dto.PaginationDTO;
import com.farmers.service.models.Feedback;
import com.farmers.service.models.Product;
import com.farmers.service.models.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("api/feedback")
public class FeedbackController {
    @Autowired
    FeedbackDAO feedbackDAO;
    @Autowired
    UserDAO userDAO;

    @Autowired
    ProductDAO productDAO;
    private ModelMapper mapper = new ModelMapper();

    @Operation( description = "Other tha admin will use this", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/save")
    public ResponseEntity<BasicResponseDTO<Feedback>> saveFeedback(@RequestBody FeedbackRequestDTO request){
        BasicResponseDTO<Feedback> response = new BasicResponseDTO<>(true, "Feedback saved", null);
        Feedback feedback = new Feedback();
        feedback.setRating(request.getRating());
        feedback.setMobileNumber(request.getMobileNumber());
        feedback.setCreatedOn(new Date());
        feedback.setReview(request.getReview());
        Optional<User> _user = userDAO.findById(request.getUserId());
        if(_user.isEmpty()){
            response.setMessage("User not found");
            response.setSuccess(false);
            return ResponseEntity.ok().body(response);
        }
        Optional<Product> _product = productDAO.findById(request.getProductId());
        if(_product.isEmpty()){
            response.setMessage("Product not found");
            response.setSuccess(false);
            return ResponseEntity.ok().body(response);
        }
        feedback.setProduct(_product.get());
        feedback.setUser(_user.get());
        feedbackDAO.save(feedback);
        response.setData(feedback);
        return ResponseEntity.ok().body(response);
    }
    @Operation( description = "Admin use this to get all feedback", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/all")
    public ResponseEntity<BasicResponseDTO<Page<Feedback>>> getAllFeedbacks(@RequestBody PaginationDTO request){
        BasicResponseDTO<Page<Feedback>> response = new BasicResponseDTO<>(true, "Feedbacks", null);
        Page<Feedback> feedback = feedbackDAO.findAll(PageRequest.of(request.getPage(), request.getSize()));
        response.setData(feedback);
        return ResponseEntity.ok().body(response);
    }
    @Operation( description = "Get feedback for particular user by userId", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/all/{userId}")
    public ResponseEntity<BasicResponseDTO<Page<Feedback>>> getAllFeedbackByUser(@RequestBody PaginationDTO request, @PathVariable("userId") Long userId){
        BasicResponseDTO<Page<Feedback>> response = new BasicResponseDTO<>(true, "Feedbacks", null);
        Optional<User> _user = userDAO.findById(userId);
        if(_user.isEmpty()){
            response.setSuccess(false);
            response.setMessage("Feedbacks not found");
            return ResponseEntity.ok().body(response);
        }
        Page<Feedback> feedback = feedbackDAO.findAllByProductUser( _user.get(),PageRequest.of(request.getPage(), request.getSize()));
        response.setData(feedback);
        return ResponseEntity.ok().body(response);
    }
}
