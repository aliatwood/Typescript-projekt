import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService, Course } from '../../services/course';

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

  constructor(private courseService: CourseService) {}

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
}