import { Injectable } from '@angular/core';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private storageKey = 'schedule';
  private courses: Course[] = [];

  constructor() {
    this.load();
  }

  private load(): void {
    const saved = localStorage.getItem(this.storageKey);
    this.courses = saved ? JSON.parse(saved) : [];
  }

  private save(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.courses));
  }

  getCourses(): Course[] {
    return this.courses;
  }

  addCourse(course: Course): boolean {
    const exists = this.courses.some(c => c.courseCode === course.courseCode);
    if (exists) return false;
    this.courses.push(course);
    this.save();
    return true;
  }

  removeCourse(courseCode: string): void {
    this.courses = this.courses.filter(c => c.courseCode !== courseCode);
    this.save();
  }

  getTotalPoints(): number {
    return this.courses.reduce((sum, c) => sum + c.points, 0);
  }
}