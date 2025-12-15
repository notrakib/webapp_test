import { Inject, Injectable } from '@nestjs/common';
import { Pool, RowDataPacket } from 'mysql2/promise';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject('MYSQL_POOL') private pool: Pool) { }

  async createUser(username: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    const [result] = await this.pool.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hash],
    );
    return result;
  }

  async findAll(id: number) {
    const [rows] = await this.pool.query<RowDataPacket[]>(
      `SELECT id, username, created_at FROM users WHERE id != ?`,
      [id]
    );

    return rows;
  }

  async findById(id: number) {
    const [rows] = await this.pool.query(
      'SELECT id, username, created_at FROM users WHERE id = ?', [
      id,
    ]);
    return rows[0];
  }

  async findByUsername(username: string) {
    const [rows] = await this.pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
    );
    return rows[0];
  }

  async followUser(followerId: number, followingId: number) {
    if (followerId === followingId) {
      throw new Error("You cannot follow yourself");
    }
    await this.pool.query(
      'INSERT IGNORE INTO follows (follower_id, following_id) VALUES (?, ?)',
      [followerId, followingId],
    );
    return { message: `User ${followerId} followed user ${followingId}` };
  }

  async unfollowUser(followerId: number, followingId: number) {
    await this.pool.query(
      'DELETE FROM follows WHERE follower_id = ? AND following_id = ?',
      [followerId, followingId],
    );
    return { message: `User ${followerId} unfollowed user ${followingId}` };
  }

  async isUserFollowed(currentUserId: number, targetUserId: number) {
    const [rows] = await this.pool.query<RowDataPacket[]>(
      `
        SELECT 1 FROM follows 
        WHERE follower_id = ? AND following_id = ?
        LIMIT 1
      `,
      [currentUserId, targetUserId],
    );

    return { isFollowed: rows.length > 0 };
  }

  async followCounts(userId: number) {
    const [followersResult] = await this.pool.query(
      'SELECT COUNT(*) as count FROM follows WHERE following_id = ?',
      [userId],
    );

    const [followingResult] = await this.pool.query(
      'SELECT COUNT(*) as count FROM follows WHERE follower_id = ?',
      [userId],
    );

    return {
      followers: followersResult[0].count,
      following: followingResult[0].count,
    };
  }
}
