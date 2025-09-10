import { BaseEntity, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({unique:true})
  @Column()
  email: string;

  @Column({ nullable: true }) // Puede ser null para usuarios de Google
  password: string;
  
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ default: false })
  isGoogleUser: boolean;
  
  @ManyToOne(() => RoleEntity, role => role.users,{ eager: true })
  role: RoleEntity;
}
