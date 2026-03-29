'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function joinAsSpare(formData) {
  const name = formData.get('name');
  const email = formData.get('email');

  if (!name || name.length < 2) {
     return { success: false, error: 'Please enter a valid full name.' };
  }
  if (!email || !email.includes('@')) {
     return { success: false, error: 'Please enter a valid email address.' };
  }

  try {
    // Block duplicate spam sign-ups securely
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
       return { success: false, error: 'This email is already registered in our system!' };
    }

    await prisma.user.create({
      data: {
        name,
        email,
        role: 'Spare'
      }
    });

    // Invalidate caches instantly so the new spare is visible everywhere
    revalidatePath('/rosters');
    revalidatePath('/dashboard');
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Database error. Please try again later.' };
  }
}
