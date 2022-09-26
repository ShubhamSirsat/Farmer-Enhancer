package com.farmers.service.controllers;

import com.farmers.service.dao.ExporterDAO;
import com.farmers.service.dao.ProductOrderDAO;
import com.farmers.service.dao.UserDAO;
import com.farmers.service.dto.*;
import com.farmers.service.models.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("api/exporter")
public class ExporterController {

    @Autowired
    ExporterDAO exporterDAO;

    @Autowired
    ProductOrderDAO productOrderDAO;

    @Autowired
    UserDAO userDAO;

    @Operation( description = "Save Exporter Demand", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/SaveExporterDemand")
    public ResponseEntity<BasicResponseDTO<Exporter>> SaveExporterDemand(@RequestBody SaveExporterDemandRequestDTO request){
        BasicResponseDTO<Exporter> response = new BasicResponseDTO<>(true, "Save Detail Successfully.", null);

        Optional<User> _user = userDAO.findById(request.getUserID());
        if(_user.isEmpty()){
            response.setMessage("User not found");
            response.setSuccess(false);
            return ResponseEntity.ok().body(response);
        }

        Exporter exporter = new Exporter();
        exporter.setUserid(request.getUserID());
        exporter.setQuentity(request.getQuentity());
        exporter.setIsPending(true);
        exporter.setProductType(request.getProductType());
        exporter.setProductName(request.getProductName());
        exporterDAO.save(exporter);
        return ResponseEntity.ok().body(response);
    }

    @Operation( description = "Get All Exporter Details", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/getAllExporterDetails")
    public ResponseEntity<GetAllExporterDetailsDTOResponse> getAllExporterDetails(@RequestBody PaginationDTO request){
        GetAllExporterDetailsDTOResponse response = new GetAllExporterDetailsDTOResponse(true, "Fetch All Data Successfully.", new ArrayList<>());
        List<Exporter> exporter = exporterDAO.findAll().stream().collect(Collectors.toList());
        response.setData(exporter);
        return ResponseEntity.ok().body(response);
    }

    @Operation( description = "Get All Exporter Details", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping("/UpdateExporterStatus")
    public ResponseEntity<BasicResponseDTO<Exporter>> UpdateExporterStatus(@RequestBody getAllExporterDetailsRequestDTO request){
        BasicResponseDTO<Exporter> response = new BasicResponseDTO<>(true, "Update Status Successfully", null);
        Exporter exporter = exporterDAO.getReferenceById(request.getExportProductID());
        if(exporter == null){
            response.setMessage("Product Not Found");
            response.setSuccess(false);
            return ResponseEntity.ok().body(response);
        }
        exporter.setIsPending(request.getIsPending());
        exporterDAO.save(exporter);
        return ResponseEntity.ok().body(response);
    }

    @Operation( description = "Manage Orders/show all orders", security = @SecurityRequirement(name = "bearerAuth"))
    @DeleteMapping("/delete-order/{id}")
    public ResponseEntity<BasicResponseDTO> deleteMyOrder(@PathVariable Long id){
        BasicResponseDTO response = new BasicResponseDTO<>(true, "Order Successfully deleted", null);
        ProductOrder productOrder = productOrderDAO.getReferenceById(id);
        if(productOrder==null){
            response.setMessage("Order not found");
            response.setSuccess(false);
            return ResponseEntity.ok(response);
        }
        productOrderDAO.delete(productOrder);
        return ResponseEntity.ok(response);
    }

}
