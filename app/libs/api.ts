import { PrismaClient, type Post } from '@prisma/client';
export type { Post } from '@prisma/client';

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

export const addPost = (post: Post) =>
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
