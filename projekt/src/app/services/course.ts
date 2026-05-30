import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Interface som definierar strukturen för ett kursobjekt
export interface Course {
  courseCode: string;
  subjectCode: string;
  level: string;
  progression: string;
  courseName: string;
  points: number;
  institutionCode: string;
  subject: string;
  syllabus: string;
}

// Service för att hämta kursdata från JSON-fil
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  // Sökväg till JSON-filen i public-mappen
  private url = 'miun_courses.json';

  constructor(private http: HttpClient) {}

  // Hämtar alla kurser och returnerar en Observable med en array av Course-objekt
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }
}