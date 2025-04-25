import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class SongsService {
  findAll(query?: { type?: string; search?: string }) {
    const { type, search } = query || {};
    return prisma.song.findMany({
      where: {
        type: type || undefined,
        title: search ? { contains: search, mode: 'insensitive' } : undefined,
      },
    });
  }

  create(data: { title: string; artist: string; type: string }) {
    return prisma.song.create({ data });
  }

  toggleFavorite(id: number) {
    return prisma.song.update({
      where: { id },
      data: { isFavorite: { set: false } },
    });
  }
}
