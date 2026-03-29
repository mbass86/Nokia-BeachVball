'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Environment variable containing the physical password, with a fallback if undefined during testing
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'NokiaNsp1!';

export async function loginAdmin(formData) {
  const password = formData.get('password');
  const cookieStore = await cookies();
  
  if (password === ADMIN_PASSWORD) {
    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // Valid for 1 week
      path: '/',
    });
    return { success: true };
  } else {
    return { success: false, error: 'Incorrect Master Password. Access Denied.' };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return { success: true };
}

export async function updateMatchAdmin(formData) {
  // Hard server-side security interceptor
  const cookieStore = await cookies();
  if (cookieStore.get('admin_session')?.value !== 'true') {
    return { success: false, error: 'Unauthorized Write Access. Please unlock the database.' };
  }

  const matchId = formData.get('matchId');
  const dateStr = formData.get('date');
  const time = formData.get('time');
  const court = formData.get('court');
  
  // Note: These inputs come from text inputs
  const homeSetsBody = formData.get('homeSetsWon');
  const awaySetsBody = formData.get('awaySetsWon');

  try {
    const updateData = {};
    if (dateStr) updateData.date = new Date(dateStr);
    if (time) updateData.time = time;
    if (court) updateData.court = court;
    
    // Safely enforce and parse integer strings out of the input, while blocking nulls
    if (homeSetsBody !== null && homeSetsBody !== '') {
       updateData.homeSetsWon = parseInt(homeSetsBody, 10);
    }
    if (awaySetsBody !== null && awaySetsBody !== '') {
       updateData.awaySetsWon = parseInt(awaySetsBody, 10);
    }

    // Automatically transition 'isReported' to true if an admin forces a score in
    if (updateData.homeSetsWon !== undefined || updateData.awaySetsWon !== undefined) {
      updateData.isReported = true;
    }

    await prisma.match.update({
      where: { id: matchId },
      data: updateData
    });

    // Invalidate the cache completely so the entire NextJS routing layer shows the new data to the public immediately
    revalidatePath('/schedule');
    revalidatePath('/dashboard');
    revalidatePath('/standings');
    revalidatePath('/admin');
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function toggleTeamPaymentStatus(teamId, currentStatus) {
  const cookieStore = await cookies();
  if (cookieStore.get('admin_session')?.value !== 'true') {
    return { success: false, error: 'Unauthorized Write Access. Please unlock the database.' };
  }

  try {
    await prisma.team.update({
      where: { id: teamId },
      data: { hasPaid: !currentStatus }
    });

    // Invalidate the cache entirely
    revalidatePath('/rosters');
    revalidatePath('/admin');
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
