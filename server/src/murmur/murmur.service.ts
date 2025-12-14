import { Inject, Injectable } from '@nestjs/common';
import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { AppConflictException } from 'src/common/exceptions/conflict.exception';
import { AppNotFoundException } from 'src/common/exceptions/not-found.exception';
import { CreateMurmurDto } from './dto/create-murmur.dto';

@Injectable()
export class MurmurService {
  constructor(@Inject('MYSQL_POOL') private pool: Pool) { }

  async createMurmur(userId: number, dto: CreateMurmurDto) {
    const [result] = await this.pool.query<ResultSetHeader>(
      'INSERT INTO murmurs (user_id, content) VALUES (?, ?)',
      [userId, dto.content],
    );

    return {
      affectedRows: result.affectedRows,
      insertId: result.insertId,
    };
  }

  async deleteMurmur(userId: number, murmurId: number) {
    const [result] = await this.pool.query<ResultSetHeader>(
      'DELETE FROM murmurs WHERE id = ? AND user_id = ?',
      [murmurId, userId],
    );

    if (result.affectedRows === 1) {
      return { message: "Murmur deletion is successful" }
    }
    else {
      throw new AppNotFoundException('Murmur not found');
    }
  }

  async getTimeline(userId: number, page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const [rows] = await this.pool.query<RowDataPacket[]>(
      `
      SELECT m.*, u.username,
      (SELECT COUNT(*) FROM likes WHERE murmur_id = m.id) as likeCount
      FROM murmurs m
      JOIN users u ON u.id = m.user_id
      WHERE m.user_id = ? OR m.user_id IN (
        SELECT following_id FROM follows WHERE follower_id = ?
      )
      ORDER BY m.created_at DESC
      LIMIT ? OFFSET ?`,
      [userId, userId, limit, offset],
    );

    return rows;
  }

  async likeMurmur(userId: number, murmurId: number) {
    const [result] = await this.pool.query<ResultSetHeader>(
      'INSERT INTO likes (user_id, murmur_id) VALUES (?, ?)',
      [userId, murmurId],
    );

    if (result.affectedRows === 1) {
      return { message: 'Liked' };
    }
    else {
      throw new AppConflictException('Murmur already liked');
    }
  }

  async unlikeMurmur(userId: number, murmurId: number) {
    const [result] = await this.pool.query<ResultSetHeader>(
      'DELETE FROM likes WHERE user_id = ? AND murmur_id = ?',
      [userId, murmurId],
    );

    if (result.affectedRows === 1) {
      return { message: 'Unliked' };
    }
    else {
      throw new AppConflictException('Murmur is not liked yet');
    }
  }
}
