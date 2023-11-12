import { Prisma } from '@prisma/client';
import prisma from '~/lib/db';

export const login = async (email: string) => {
  try {
    const user = await prisma.smstudentinformation.findUniqueOrThrow({
      where: {
        EmailAddress: email,
      },
    });

    return {
      user,
      error: null,
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code == 'P2025') {
        return { error: 'user not found', user: null };
      }
    }
    return { error: 'error', user: null };
  }
};
