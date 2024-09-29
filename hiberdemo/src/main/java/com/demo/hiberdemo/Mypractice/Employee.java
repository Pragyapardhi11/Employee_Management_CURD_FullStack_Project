package com.demo.hiberdemo.Mypractice;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;


@Entity
//@Data ko use nhi kara islay yaha getter setter methods banana pada
public class Employee {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;
 private String name ;
 private String email ;
 private String department;

 public String getName() {
  return name;
 }

 public void setName(String name) {
  this.name = name;
 }

 // Getter and Setter for email
 public String getEmail() {
  return email;
 }

 public void setEmail(String email) {
  this.email = email;
 }

 // Getter and Setter for department
 public String getDepartment() {
  return department;
 }

 public void setDepartment(String department) {
  this.department = department;
 }

}
