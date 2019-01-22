import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class MagicSampleDataLog {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsNotEmpty()
  tableName: string;

  @Column({ type: 'varchar', length: 32, nullable: false })
  @IsNotEmpty()
  md5: string;

  @Column({ type: "timestamp", nullable: false })
  @IsNotEmpty()
  createdDate: Date;
}
