import { Component, OnInit, signal, computed } from '@angular/core';
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
  private allCourses = signal<Course[]>([]);
  searchText = signal('');
  selectedSubject = signal('');
  sortColumn = signal('');
  sortAsc = signal(true);
  subjects = signal<string[]>([]);

  filteredCourses = computed(() => {
    const search = this.searchText().toLowerCase();
    const subject = this.selectedSubject();
    const column = this.sortColumn();
    const asc = this.sortAsc();

    let result = this.allCourses().filter(c => {
      const matchSearch = c.courseCode.toLowerCase().includes(search) ||
                          c.courseName.toLowerCase().includes(search);
      const matchSubject = subject ? c.subject === subject : true;
      return matchSearch && matchSubject;
    });

    if (column) {
      result = [...result].sort((a, b) => {
        const valA = (a as any)[column];
        const valB = (b as any)[column];
        if (valA < valB) return asc ? -1 : 1;
        if (valA > valB) return asc ? 1 : -1;
        return 0;
      });
    }

    return result;
  });

  constructor(
    private courseService: CourseService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.allCourses.set(data);
      this.subjects.set([...new Set(data.map(c => c.subject))].sort());
    });
  }

  sort(column: string): void {
    if (this.sortColumn() === column) {
      this.sortAsc.set(!this.sortAsc());
    } else {
      this.sortColumn.set(column);
      this.sortAsc.set(true);
    }
  }

  addToSchedule(course: Course): void {
    this.scheduleService.addCourse(course);
  }
}