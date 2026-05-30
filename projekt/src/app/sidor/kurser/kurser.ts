import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, Course } from '../../services/course';

@Component({
  selector: 'app-kurser',
  imports: [CommonModule],
  templateUrl: './kurser.html',
  styleUrl: './kurser.css',
})
export class Kurser implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
      this.filteredCourses = data;
    });
  }
}