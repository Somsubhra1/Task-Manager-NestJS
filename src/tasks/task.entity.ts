import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    default: true,
  })
  isCompleted: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  taskDate: Date;
}
