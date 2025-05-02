import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  
  workers: defineTable(
    v.object({
      fullName: v.string(),
      idNumber: v.string(),
      address: v.string(),
      dob: v.string(),
      gender: v.string(),
      contactNumber: v.string(),
      email: v.string(),
      qualifications: v.string(),
      experience: v.string(),
    })
  ),

  Materials: defineTable(
    v.object({
      clientName: v.string(),
      siteName: v.string(),
      clientLocation: v.string(),
      description: v.string(),
      totalCost: v.number(),
      materials: v.array(
        v.object({
          name: v.string(),
          quantity: v.number(),
          unitPrice: v.number(),
        })
      ),
    })
  ),

  payroll: defineTable(
    v.object({
      workerId: v.string(),
      baseSalary: v.number(),
      bonus: v.number(),
      totalPay: v.number(),
      otHours: v.number(),
      epf: v.number(),    
      etf: v.number(),
      paid: v.boolean(),
    })
  ),

  contacts: defineTable(
    v.object({
      name: v.string(),
      email: v.string(),
      subject: v.string(),
      message: v.string(),
    })

  ),

  admins: defineTable(
    v.object({
      username: v.string(),
      password: v.string(),
      
    })
  ),

  projectInfo: defineTable(
    v.object({
      jobType: v.string(),
      jobName: v.string(),
      jobAddress: v.string(),
      projectStartDate: v.string(),
      projectEndDate: v.string(),
      contractorType: v.string(),
      notes: v.string(),
      ownerName: v.string(),
      ownerCompany: v.string(),
      ownerEmail: v.string(),
      ownerPhone: v.string(),
    })
  ),


});

