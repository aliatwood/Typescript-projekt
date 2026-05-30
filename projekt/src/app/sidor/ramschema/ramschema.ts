import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleService } from '../../services/schedule';
import { Course } from '../../services/course';

// Komponent för att visa och hantera ramschemat
@Component({
  selector: 'app-ramschema',
  imports: [CommonModule],
  templateUrl: './ramschema.html',
  styleUrl: './ramschema.css',
})
export class Ramschema implements OnInit {
  // Array med kurser i ramschemat
  courses: Course[] = [];

  // Totala högskolepoäng för valda kurser
  totalPoints: number = 0;

  constructor(private scheduleService: ScheduleService) {}

  // Hämtar kurser och totala poäng vid komponentens uppstart
  ngOnInit(): void {
    this.courses = this.scheduleService.getCourses();
    this.totalPoints = this.scheduleService.getTotalPoints();
  }

  // Tar bort en kurs från ramschemat och uppdaterar listan och poängen
  removeCourse(courseCode: string): void {
    this.scheduleService.removeCourse(courseCode);
    this.courses = this.scheduleService.getCourses();
    this.totalPoints = this.scheduleService.getTotalPoints();
  }
}