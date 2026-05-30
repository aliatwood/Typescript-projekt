import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleService } from '../../services/schedule';
import { Course } from '../../services/course';

@Component({
  selector: 'app-ramschema',
  imports: [CommonModule],
  templateUrl: './ramschema.html',
  styleUrl: './ramschema.css',
})
export class Ramschema implements OnInit {
  courses: Course[] = [];
  totalPoints: number = 0;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.courses = this.scheduleService.getCourses();
    this.totalPoints = this.scheduleService.getTotalPoints();
  }

  removeCourse(courseCode: string): void {
    this.scheduleService.removeCourse(courseCode);
    this.courses = this.scheduleService.getCourses();
    this.totalPoints = this.scheduleService.getTotalPoints();
  }
}