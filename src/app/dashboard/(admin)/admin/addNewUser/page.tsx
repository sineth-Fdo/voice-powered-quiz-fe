'use client';

import { signup } from '@/api/auth/authApi';
import FormSection, { FormData } from '@/components/src/dashboard-conponents/addNewUser/formSection'
import React from 'react'
import { useToast } from "@/hooks/use-toast";

const AddNewUserPage = () => {
  const { toast } = useToast();


  const onSubmit = async (data: FormData) => {
      const response = await signup(
        {
          email: data.email,
          name: data.name,
          password: data.password,
          role: data.role,
          batch: data.batch || '',
          grade: data.grade || ''
        }
      );
      console.log(response);
      if (response.error) {
        toast({
          title: "Register Failed",
          description: `${response.error}`,
          duration: 5000,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Done",
        description: `${response}`,
        duration: 5000,
        variant: "default",
        className: "bg-GREEN text-PRIMARY_TEXT",
      });
    
    
  }

  return (
    <div className=' w-[100%] min-h-screen flex justify-center items-center'>
      <FormSection onSubmit={onSubmit} />
    </div>
  )
}

export default AddNewUserPage