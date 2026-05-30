import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Komponent för startsidan
@Component({
  selector: 'app-hem',
  imports: [CommonModule, RouterLink],
  templateUrl: './hem.html',
  styleUrl: './hem.css',
})
export class Hem {}