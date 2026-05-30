import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ScheduleService } from './services/schedule';
import { CommonModule } from '@angular/common';

// Rot-komponent som hanterar navbar, routing och footer
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Publikt så att navbar-badge kan läsa antal kurser i ramschemat
  constructor(public scheduleService: ScheduleService) {}
}