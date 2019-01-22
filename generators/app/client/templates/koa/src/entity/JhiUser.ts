import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  PrimaryColumn, JoinTable
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { JhiAuthority } from './JhiAuthority';

@Entity()
export class JhiUser {

  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  @Column({ type: "varchar", length: 50, nullable: false })
  @IsNotEmpty()
  login: string;

  @Column({ type: "varchar", length: 60, nullable: false })
  @IsNotEmpty()
  passwordHash: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  firstName: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  lastName: string;

  @Column({ type: "varchar", length: 254, nullable: true })
  email: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  imageUrl: string;

  @Column({ type: "tinyint", nullable: false })
  @IsNotEmpty()
  activated: boolean;

  @Column({ type: "varchar", length: 6, nullable: true })
  langKey: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  activationKey: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  resetKey: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  @IsNotEmpty()
  createdBy: string;

  @Column({ type: "timestamp", nullable: true })
  createdDate: Date;

  @Column({ type: "timestamp", nullable: true })
  resetDate: Date;

  @Column({ type: "varchar", length: 50, nullable: true })
  lastModifiedBy: string;

  @Column({ type: "timestamp", nullable: true })
  lastModifiedDate: Date;

  @ManyToMany(type => JhiAuthority)
  @JoinTable({
    name: 'jhi_user_authority',
    joinColumns: [{ name: 'userId' }],
    inverseJoinColumns: [{ name: 'authorityName', referencedColumnName: 'name' }]
  })
  authorities: JhiAuthority[];

}
