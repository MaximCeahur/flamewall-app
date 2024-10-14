import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', length: 20 })
  username: string;

  @Column({ type: 'varchar', length: 20 })
  minecraft_username: string;

  @Column({ type: 'timestamp' })
  first_login: Date;

  @Column({ type: 'varchar', length: 70 })
  description: string;

  @Column({ type: 'varchar', length: 40 })
  pfp_url: string;

  @Column({ type: 'varchar', length: 40 })
  banner_url: string;

  @Column({ type: 'enum', enum: UserRankEnum })
  rank: UserRankEnum;

  @Column({ type: 'varchar', length: 100 })
  minecraft_skin_url: string;
}
