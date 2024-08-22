import { PrismaClient, type Prisma } from '@prisma/client';
export { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllPosts = (search: string | null) =>
  prisma.post
    .findMany({
      where: {
        title: {
          contains: search || '',
        },
      },
    })
    .then();

export const getPost = (id: number) =>
  prisma.post
    .findUnique({
      where: {
        id: id,
      },
    })
    .then();

export const addPost = (post: Prisma.PostCreateInput) =>
  prisma.post
    .create({
      data: post,
    })
    .then();

export const deletePost = (id: number) =>
  prisma.post
    .delete({
      where: {
        id: id,
      },
    })
    .then();
