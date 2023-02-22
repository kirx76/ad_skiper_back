import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {SkipPhase} from '../skipPhase/skipPhase.entity';

@Entity()
export class Video {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @OneToMany(() => SkipPhase, (skipPhase) => skipPhase.video)
    skipPhases: SkipPhase[];
}
