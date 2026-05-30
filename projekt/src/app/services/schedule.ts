import { Injectable } from '@angular/core';
import { Course } from './course';

// Service för att hantera ramschemat och localStorage
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  // Nyckel för localStorage
  private storageKey = 'schedule';

  // Array med valda kurser
  private courses: Course[] = [];

  constructor() {
    // Laddar in sparade kurser vid start
    this.load();
  }

  // Läser in kurser från localStorage
  private load(): void {
    const saved = localStorage.getItem(this.storageKey);
    this.courses = saved ? JSON.parse(saved) : [];
  }

  // Sparar kurser till localStorage
  private save(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.courses));
  }

  // Returnerar alla kurser i ramschemat
  getCourses(): Course[] {
    return this.courses;
  }

  // Lägger till en kurs om den inte redan finns, returnerar false vid dubbel
  addCourse(course: Course): boolean {
    const exists = this.courses.some(c => c.courseCode === course.courseCode);
    if (exists) return false;
    this.courses.push(course);
    this.save();
    return true;
  }

  // Tar bort en kurs baserat på kurskod
  removeCourse(courseCode: string): void {
    this.courses = this.courses.filter(c => c.courseCode !== courseCode);
    this.save();
  }

  // räknar och returnerar totala högskolepoäng
  getTotalPoints(): number {
    return this.courses.reduce((sum, c) => sum + c.points, 0);
  }
}