import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Video} from '../video/video.entity';

@Entity()
export class SkipPhase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    from: number;

    @Column()
    to: number;

    @ManyToOne(() => Video, (video) => video.skipPhases)
    video: Video;
}
