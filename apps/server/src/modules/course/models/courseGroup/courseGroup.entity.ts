import {
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { Course } from '../../../course/models/course/course.entity';

@Entity({ name: 'course_group' })
export class CourseGroup {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;
    
    @ManyToMany(() => Course, (course) => course.prerequisiteCourseGroups, {
        eager: true,
        onDelete: 'CASCADE',
    })
    courses: Course[];
}