package com.farmers.service.controllers;

import com.farmers.service.dao.ProductDAO;
import com.farmers.service.dao.ProductOrderDAO;
import com.farmers.service.dao.UserDAO;
import com.farmers.service.dao.VehicleDAO;
import com.farmers.service.dto.BasicResponseDTO;
import com.farmers.service.dto.PaginationDTO;
import com.farmers.service.enums.UserRoleEnum;
import com.farmers.service.models.Product;
import com.farmers.service.models.ProductOrder;
import com.farmers.service.models.User;
import com.farmers.service.models.Vehicle;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("api/admin")
public class AdminController {
    @Autowired
    UserDAO userDAO;

    @Autowired
    VehicleDAO vehicleDAO;
    @Autowired
    ProductOrderDAO productOrderDAO;

    @Autowired
    ProductDAO productDAO;

    private ModelMapper mapper = new ModelMapper();

    @Operation( description = "Manage users/show all users", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/all-users")
    public ResponseEntity<BasicResponseDTO<Page<User>>> getUsers(@RequestBody PaginationDTO request){
        BasicResponseDTO<Page<User>> response = new BasicResponseDTO<>(true, "No records found", null);
        Page<User> userPage = userDAO.findAllByRoleNot(UserRoleEnum.ADMIN, PageRequest.of(request.getPage(), request.getSize()));
        response.setMessage(userPage.getContent().isEmpty() ?"No records": "record found" );
        response.setData(userPage);
        return ResponseEntity.ok(response);
    }

//    @Operation( description = "Manage Orders/show all orders", security = @SecurityRequirement(name = "bearerAuth"))
//    @DeleteMapping("/delete-Customer/{id}")
//    public ResponseEntity<BasicResponseDTO> deleteCustomer(@PathVariable Long id){
//        BasicResponseDTO response = new BasicResponseDTO<>(true, "Customer Successfully deleted", null);
//        User user = userDAO.getReferenceById(id);
//
//        if(user == null){
//            response.setMessage("User not found");
//            response.setSuccess(false);
//            return ResponseEntity.ok(response);
//        }
//
//        userDAO.delete(user);
//        response.setMessage("Delete Customer Successfully");
//        response.setSuccess(true);
//        return ResponseEntity.ok(response);
//    }

    @Operation( description = "Manage transport/show all vehicles", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/all-transports")
    public ResponseEntity<BasicResponseDTO<Page<Vehicle>>> getVehicles(@RequestBody PaginationDTO request){
        BasicResponseDTO<Page<Vehicle>> response = new BasicResponseDTO<>(true, "No records found", null);
        Page<Vehicle> vehicles = vehicleDAO.findAll(PageRequest.of(request.getPage(), request.getSize()));
        response.setMessage(vehicles.getContent().isEmpty() ?"No records": "record found" );
        response.setData(vehicles);
        return ResponseEntity.ok(response);
    }

    @Operation( description = "Manage Orders/show all orders", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/all-orders")
    public ResponseEntity<BasicResponseDTO<Page<ProductOrder>>> getOrders(@RequestBody PaginationDTO request){
        BasicResponseDTO<Page<ProductOrder>> response = new BasicResponseDTO<>(true, "No records found", null);
        Page<ProductOrder> orders = productOrderDAO.findAll(PageRequest.of(request.getPage(), request.getSize()));
        response.setMessage(orders.getContent().isEmpty() ?"No records": "record found" );
        response.setData(orders);
        return ResponseEntity.ok(response);
    }

    @Operation( description = "Manage Orders/show all orders", security = @SecurityRequirement(name = "bearerAuth"))
    @DeleteMapping("/delete-order/{id}")
    public ResponseEntity<BasicResponseDTO<ProductOrder>> deleteOrder(@PathVariable Long id){
        BasicResponseDTO<ProductOrder> response = new BasicResponseDTO<>(true, "Order deleted", null);
        ProductOrder productOrder = productOrderDAO.getReferenceById(id);
        if(productOrder==null){
            response.setMessage("Product Order not found");
            response.setSuccess(false);
            return ResponseEntity.ok(response);
        }
        productOrderDAO.delete(productOrder);
        return ResponseEntity.ok(response);
    }

    @Operation( description = "Manage products/show all products", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/all-products")
    public ResponseEntity<BasicResponseDTO<Page<Product>>> getProducts(@RequestBody PaginationDTO request){
        BasicResponseDTO<Page<Product>> response = new BasicResponseDTO<>(true, "No records found", null);
        Page<Product> products = productDAO.findAll(PageRequest.of(request.getPage(), request.getSize()));
        response.setMessage(products.getContent().isEmpty() ?"No records": "record found" );
        response.setData(products);
        return ResponseEntity.ok(response);
    }

//    @Operation( description = "Manage Orders/show all orders", security = @SecurityRequirement(name = "bearerAuth"))
//    @DeleteMapping("/delete-Product/{id}")
//    public ResponseEntity<BasicResponseDTO> deleteProduct(@PathVariable Long id){
//        BasicResponseDTO response = new BasicResponseDTO<>(true, "Order deleted", null);
//        Product products = productDAO.getReferenceById(id);
//        if(products==null){
//            response.setMessage("Product not found");
//            response.setSuccess(false);
//            return ResponseEntity.ok(response);
//        }
//        productDAO.delete(products);
//        response.setMessage("Product Delete Successfully");
//        response.setSuccess(true);
//        return ResponseEntity.ok(response);
//    }

}
