import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService, Course } from '../../services/course';
import { ScheduleService } from '../../services/schedule';

@Component({
  selector: 'app-kurser',
  imports: [CommonModule, FormsModule],
  templateUrl: './kurser.html',
  styleUrl: './kurser.css',
})
export class Kurser implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchText: string = '';
  subjects: string[] = [];
  selectedSubject: string = '';
  sortColumn: string = '';
  sortAsc: boolean = true;

  constructor(
    private courseService: CourseService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
      this.filteredCourses = data;
      this.subjects = [...new Set(data.map(c => c.subject))].sort();
    });
  }

  filter(): void {
    const search = this.searchText.toLowerCase();
    this.filteredCourses = this.courses.filter(c => {
      const matchSearch = c.courseCode.toLowerCase().includes(search) ||
                          c.courseName.toLowerCase().includes(search);
      const matchSubject = this.selectedSubject ? c.subject === this.selectedSubject : true;
      return matchSearch && matchSubject;
    });
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = column;
      this.sortAsc = true;
    }

    this.filteredCourses.sort((a, b) => {
      const valA = (a as any)[column];
      const valB = (b as any)[column];
      if (valA < valB) return this.sortAsc ? -1 : 1;
      if (valA > valB) return this.sortAsc ? 1 : -1;
      return 0;
    });
  }

  addToSchedule(course: Course): void {
    this.scheduleService.addCourse(course);
  }
}