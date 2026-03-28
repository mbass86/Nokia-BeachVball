'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitScore(matchId, homeSets, awaySets) {
  try {
    await prisma.match.update({
      where: { id: matchId },
      data: {
        homeSetsWon: parseInt(homeSets, 10),
        awaySetsWon: parseInt(awaySets, 10),
        isReported: true,
      }
    });
    
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Failed to report score:', error);
    return { success: false, error: 'Failed to report score.' };
  }
}
