import asyncHandler from 'express-async-handler'

import {prisma} from '../config/prismaConfig.js'

export const createResidency = asyncHandler(async(req,res)=>{
    const { 
        title, 
        description, 
        price, 
        address, 
        country, 
        city, 
        facilities, 
        image, 
        userEmail 
      } = req.body.data;
      
      console.log(req.body.data);
      
      try {
        // Step 1: Check if a Residency with the same userEmail and address already exists
        const existingResidency = await prisma.residency.findFirst({
            where: {
              address: address,
              userEmail: userEmail
            }
          });
      
        if (existingResidency) {
          // If a residency already exists, return a conflict message
          return res.status(400).send({ message: "A residency with this address already exists for this user." });
        }
      
        // Step 2: Create the new Residency
        const residency = await prisma.residency.create({
          data: {
            title,
            description,
            price,
            address,
            country,
            city,
            facilities,
            image,
            owner: { connect: { email: userEmail } },
          }
        });
      
        return res.send({ message: "Residency created successfully", residency });
      
      } catch (err) {
        console.error('Error during residency creation:', err);  // Log error for debugging
      
        // Handle the specific unique constraint violation error (P2002)
        if (err.code === "P2002") {
          return res.status(400).send({ message: "A residency with this address already exists." });
        }
      
        // General error handling
        return res.status(500).send({ message: err.message });
      }
})

export const getAllResidencies = asyncHandler(async(req,res) =>{
    try {
        const residencies = await prisma.residency.findMany({
            orderBy : {
                createdAt: "desc"
            }
        })
        res.send(residencies);
    } catch (error) {
        console.log(error)

    }
})

export const getResidency = asyncHandler(async(req,res) =>{
    const {id} = req.params;
    try {
        const residency = await prisma.residency.findUnique({
            where : {id}
        })
        res.send(residency);
    } catch (err) {
        throw new Error(err.message)
    }
})