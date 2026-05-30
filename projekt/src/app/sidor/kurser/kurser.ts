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
  // Signal med alla kurser från JSON-filen
  private allCourses = signal<Course[]>([]);

  // Signal för söktext
  searchText = signal('');

  // Signal för valt ämne i dropdown
  selectedSubject = signal('');

  // Signal för aktiv sorteringskolumn
  sortColumn = signal('');

  // Signal för sorteringsriktning
  sortAsc = signal(true);

  // Signal med lista av unika ämnen för dropdown
  subjects = signal<string[]>([]);

  // Computed som automatiskt filtrerar och sorterar kurser vid ändringar
  filteredCourses = computed(() => {
    const search = this.searchText().toLowerCase();
    const subject = this.selectedSubject();
    const column = this.sortColumn();
    const asc = this.sortAsc();

    // Filtrerar på söktext och valt ämne
    let result = this.allCourses().filter(c => {
      const matchSearch = c.courseCode.toLowerCase().includes(search) ||
                          c.courseName.toLowerCase().includes(search);
      const matchSubject = subject ? c.subject === subject : true;
      return matchSearch && matchSubject;
    });

    // Sortera om en kolumn är vald
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

  // Hämtar kursdata och sätter unika ämnen vid komponentens start
  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.allCourses.set(data);
      this.subjects.set([...new Set(data.map(c => c.subject))].sort());
    });
  }

  // Växlar sorteringsriktning om samma kolumn klickas, annars byt kolumn
  sort(column: string): void {
    if (this.sortColumn() === column) {
      this.sortAsc.set(!this.sortAsc());
    } else {
      this.sortColumn.set(column);
      this.sortAsc.set(true);
    }
  }

  // Lägger till en kurs i ramschemat via ScheduleService
  addToSchedule(course: Course): void {
    this.scheduleService.addCourse(course);
  }

  // Kontrollerar om en kurs redan finns i ramschemat
  isInSchedule(courseCode: string): boolean {
    return this.scheduleService.getCourses().some(c => c.courseCode === courseCode);
  }
}