import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    default: false,
  })
  isCompleted: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  taskDate: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
