import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
import { User } from '../../../users/models/user/user.entitiy';
import { CourseGroup } from '../courseGroup/courseGroup.entity';

@Entity({ name: 'course' })
export class Course {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    
    @Column( { unique: true })
    code: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    isBase: boolean;

    @Column()
    image: string;

    @Column({ nullable: true })
    startDate?: Date;

    @Column({ nullable: true })
    endDate?: Date;

    @Column({ nullable: true })
    academicDuration?: string;

    @Column({ nullable: true })
    academicYear?: string;

    @ManyToMany(() => User, (user) => user.coursesEnrolled, {
      lazy: true,
      onDelete: 'CASCADE',
    })
    students: User[];

    @ManyToMany(() => User, (user) => user.coursesCompleted, {
      lazy: true,
      onDelete: 'CASCADE',
    })
    studentsCompleted: Promise<User[]>;

    @ManyToMany(() => User, (user) => user.coursesTeaching, {
      lazy: true,
      onDelete: 'CASCADE',
    })
    teachers: User[];

    @ManyToMany(() => CourseGroup, (group) => group.courses, {
      eager: true,
      onDelete: 'CASCADE',
    })
    @JoinTable()
    prerequisiteCourseGroups: CourseGroup[];

    @ManyToMany(() => Course, (course) => course.prerequisiteCourses, {
      eager: true,
      onDelete: 'CASCADE',
    })
    @JoinTable()
    prerequisiteCourses: Course[];

    @ManyToOne(() => Course, (course) => course.childCourses, {
      onDelete: 'CASCADE',
      eager: true,
    })
    @JoinTable()
    parentCourse: Course;
  
    @OneToMany(() => Course, (course) => course.parentCourse, {
      onDelete: 'CASCADE',
      lazy: true,
    })
    childCourses: Promise<Course[]>;
}
