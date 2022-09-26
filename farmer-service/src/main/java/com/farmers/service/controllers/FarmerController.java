package com.farmers.service.controllers;

import com.farmers.service.dao.ProductDAO;
import com.farmers.service.dao.ProductOrderDAO;
import com.farmers.service.dao.UserDAO;
import com.farmers.service.dao.VehicleDAO;
import com.farmers.service.dto.*;
import com.farmers.service.enums.ProductTypeEnum;
import com.farmers.service.models.Product;
import com.farmers.service.models.ProductOrder;
import com.farmers.service.models.User;
import com.farmers.service.models.Vehicle;
import com.farmers.service.services.FilesStorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("api/farmer")
public class FarmerController {
    @Autowired
    UserDAO userDAO;

    @Autowired
    VehicleDAO vehicleDAO;
    @Autowired
    ProductOrderDAO productOrderDAO;

    @Autowired
    ProductDAO productDAO;

    @Autowired
    FilesStorageService storageService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Value("${files.upload.url}")
    private String uploadUrl;
    private ModelMapper mapper = new ModelMapper();


    @Operation( description = "show all seeds", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/all-seeds")
    public ResponseEntity<BasicResponseDTO<Page<Product>>> getSeedProducts(@RequestBody PaginationDTO request){
        BasicResponseDTO<Page<Product>> response = new BasicResponseDTO<>(true, "No records found", null);
        Page<Product> products = productDAO.findAllByProductType( ProductTypeEnum.SEEDS ,PageRequest.of(request.getPage(), request.getSize()));
        response.setMessage(products.getContent().isEmpty() ?"No records": "record found" );
        response.setData(products);
        return ResponseEntity.ok(response);
    }

    @Operation( description = "Products list added by current user", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/my-products/{userId}")
    public ResponseEntity<BasicResponseDTO<Page<Product>>> getMyProducts(@RequestBody PaginationDTO request, @PathVariable Long userId){
        BasicResponseDTO<Page<Product>> response = new BasicResponseDTO<>(true, "No records found", null);
        Optional<User> _user = userDAO.findById(userId);
        if(_user.isEmpty()){
            response.setSuccess(false);
            response.setMessage("User not found");
            return ResponseEntity.ok(response);
        }
        Page<Product> products = productDAO.findAllByUser( _user.get() ,PageRequest.of(request.getPage(), request.getSize()));
        response.setMessage(products.getContent().isEmpty() ?"No records": "record found" );
        response.setData(products);
        return ResponseEntity.ok(response);
    }

    @Operation( description = "Orders placed by farmer", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/my-orders/{userId}")
    public ResponseEntity<BasicResponseDTO<Page<ProductOrder>>> getOrders(@RequestBody PaginationDTO request, @PathVariable Long userId){
        BasicResponseDTO<Page<ProductOrder>> response = new BasicResponseDTO<>(true, "No records found", null);
        Optional<User> _user = userDAO.findById(userId);
        if(_user.isEmpty()){
            response.setSuccess(false);
            response.setMessage("User not found");
            return ResponseEntity.ok(response);
        }
        Page<ProductOrder> orders = productOrderDAO.findAllByUser(_user.get() ,PageRequest.of(request.getPage(), request.getSize()));
        response.setMessage(orders.getContent().isEmpty() ?"No records": "record found" );
        response.setData(orders);
        return ResponseEntity.ok(response);
    }

    @Operation( description = "Manage Orders/show all orders", security = @SecurityRequirement(name = "bearerAuth"))
    @DeleteMapping("/delete-Product/{id}")
    public ResponseEntity<BasicResponseDTO> deleteProductDetail(@PathVariable Long id){
        BasicResponseDTO<ProductOrder> response = new BasicResponseDTO<>(true, "Product Successfully deleted", null);
        Product product = productDAO.getReferenceById(id);
        if(product == null ){
            response.setMessage("Product Not found");
            response.setSuccess(false);
            return ResponseEntity.ok(response);
        }
        productDAO.delete(product);
        return ResponseEntity.ok(response);
    }

    @Operation( description = "User profile", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/my-details/{userId}")
    public ResponseEntity<BasicResponseDTO<User>> getOrders(@PathVariable Long userId){
        BasicResponseDTO<User> response = new BasicResponseDTO<>(true, "User details", null);
        Optional<User> _user = userDAO.findById(userId);
        if(_user.isEmpty()){
            response.setSuccess(false);
            response.setMessage("User not found");
            return ResponseEntity.ok(response);
        }
        response.setData(_user.get());
        return ResponseEntity.ok(response);
    }

    @Operation( description = "User update profile", security = @SecurityRequirement(name = "bearerAuth"))
    @PutMapping("/update-my-details")
    public ResponseEntity<BasicResponseDTO<User>> getOrders(@RequestBody UpdateUserDTO request){
        BasicResponseDTO<User> response = new BasicResponseDTO<>(true, "Updated", null);
        Optional<User> _user = userDAO.findById(request.getUserId());
        if(_user.isEmpty()){
            response.setSuccess(false);
            response.setMessage("User not found");
            return ResponseEntity.ok(response);
        }
        User user = _user.get();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setMobileNumber(request.getMobileNumber());
        user.setAddress(request.getAddress());
        user.setCity(request.getCity());
        user.setZip(request.getZip());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userDAO.save(user);
        response.setData(user);
        return ResponseEntity.ok(response);
    }

    @Operation( description = "Add new product / THis also used by seed supplier", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping(value = "/common/add-product", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<BasicResponseDTO<Product>> addProduct( @ModelAttribute SaveProductDTO request){
        BasicResponseDTO<Product> response = new BasicResponseDTO<>(true, "Product added", null);
        Optional<User> _user = userDAO.findById(request.getUserId());
        if(_user.isEmpty()){
            response.setSuccess(false);
            response.setMessage("User not found");
            return ResponseEntity.ok(response);
        }
        Product product = mapper.map(request, Product.class);
        product.setUser(_user.get());
        Optional<String> _fileName =  storageService.save(request.getProductImage());
        if(_fileName.isEmpty()){
            response.setSuccess(false);
            response.setMessage("File upload failed");
            return ResponseEntity.ok(response);
        }
        product.setId(null);
        product.setImageUrl(uploadUrl+ _fileName.get());
        productDAO.save(product);
        response.setData(product);
        return ResponseEntity.ok(response);
    }

    @Operation( description = "Make order", security = @SecurityRequirement(name = "bearerAuth"))
    @Transactional
    @PostMapping("/common/place-order")
    public ResponseEntity<BasicResponseDTO<ProductOrder>> placeOrder( @RequestBody SaveOrderDTO request){
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        BasicResponseDTO<ProductOrder> response = new BasicResponseDTO<>(true, "Product Order added", null);
        Optional<User> _user = userDAO.findById(request.getUserId());
        Optional<Product> _product = productDAO.findById(request.getProductId());
        if(_user.isEmpty() || _product.isEmpty()){
            response.setSuccess(false);
            response.setMessage("User / Product not found");
            return ResponseEntity.ok(response);
        }
        ProductOrder order = mapper.map(request, ProductOrder.class);
        order.setId(null);
        order.setUser(_user.get());
        order.setProduct(_product.get());
        order.setDeliveryStatus(false);
        order.setOrderDate(new Date());
        productOrderDAO.save(order);
        if(request.getHaveVehicle()){
            Vehicle vehicle = mapper.map(request.getVehicleDetails(), Vehicle.class);
            vehicle.setId(null);
            vehicle.setProductOrder(order);
            vehicleDAO.save(vehicle);
        }
        response.setData(order);
        return ResponseEntity.ok(response);
    }

    @Operation( description = "deliver particular product", security = @SecurityRequirement(name = "bearerAuth"))
    @PatchMapping("/common/deliver-order/{orderId}")
    public ResponseEntity<BasicResponseDTO<ProductOrder>> delieverOrder( @PathVariable Long orderId){
        BasicResponseDTO<ProductOrder> response = new BasicResponseDTO<>(true, "Product Order deleverd", null);

        Optional<ProductOrder> _order = productOrderDAO.findById(orderId);
        if(_order.isEmpty()){
            response.setSuccess(false);
            response.setMessage("Order not found");
            return ResponseEntity.ok(response);
        }
        ProductOrder order = _order.get();
        order.setDeliveryStatus(true);
        productOrderDAO.save(order);
        response.setData(order);
        return ResponseEntity.ok(response);
    }

    @Operation( description = "Product orderes which product addded by curent user", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/common/my-product-orders/{userId}")
    public ResponseEntity<BasicResponseDTO<List<ProductOrder>>> getMyProductOrders(@PathVariable("userId") Long userId){
        BasicResponseDTO<List<ProductOrder>> response = new BasicResponseDTO<>(true, "Product Order details", null);
        List<ProductOrder> productOrders = new ArrayList<>();
        Optional<User> _user = userDAO.findById(userId);
        if(_user.isEmpty()){
            response.setSuccess(false);
            response.setMessage("User not found");
            return ResponseEntity.ok(response);
        }
        productDAO.findAllByUser(_user.get(),null).map(product -> {
            Optional<ProductOrder> _p =  productOrderDAO.findByProduct(product);
            if(_p.isPresent())
                productOrders.add(_p.get());
            return product;
        });
        response.setData(productOrders);
        return ResponseEntity.ok(response);
    }

}
