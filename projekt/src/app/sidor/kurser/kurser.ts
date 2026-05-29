import { Component, OnInit } from '@angular/core';
import { CourseService, Course } from '../../services/course';

@Component({
  selector: 'app-kurser',
  templateUrl: './kurser.html',
  styleUrls: ['./kurser.css']
})
export class Kurser implements OnInit {

  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }
}