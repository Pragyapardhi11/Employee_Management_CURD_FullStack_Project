package com.demo.hiberdemo.Controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.*;

import com.demo.hiberdemo.Mypractice.Employee;
import com.demo.hiberdemo.Services.EmployeeServices;

import jakarta.persistence.EntityNotFoundException;
import lombok.Data;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
////@RequiredArgsConstructor
@Data
@CrossOrigin("*")
public class EmployeeController{

    @Autowired
    private final EmployeeServices employeeServices;


//    public EmployeeController(EmployeeServices employeeServices) {
//        this.employeeServices = employeeServices;
//    }


    @PostMapping("/employee")
    public Employee postEmployee(@RequestBody Employee employee){
        return employeeServices.postEmployee(employee);
    }

    @GetMapping("/employees")
    public List<Employee> getAllEmployee(){
        return employeeServices.getAllEmployee();
    }


    @DeleteMapping("/employee/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id){
        try{
            employeeServices.deleteEmployee(id);
            return new ResponseEntity<>("Employee with ID " + id+ " deleted Successfully " , HttpStatus.OK);
        }catch(EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id){
        Employee employee = employeeServices.getEmployeeById(id);
        if(employee == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(employee);
    }

    @PatchMapping("/employee/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id , @RequestBody Employee employee){
        Employee updateEmployee = employeeServices.updateEmployee(id,employee);

        if(updateEmployee == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.ok(updateEmployee);


    }

}
