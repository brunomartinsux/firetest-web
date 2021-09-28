import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/assets/canvasjs.min.js';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  schoolPath: string = 'firetest.app/schools/colegiomarista.sc';
  copied? = false;
  accepted = false;
  refused = false;

  constructor() {}

  ngOnInit(): void {
    CanvasJS.addColorSet('fireShades', ['#10B981', '#FBBF24', '#EF4444']);

    let chart = new CanvasJS.Chart('chartContainer', {
      backgroundColor: 'transparent',
      click: () => {},
      colorSet: 'fireShades',
      data: [
        {
          type: 'doughnut',
          radius: '90%',
          innerRadius: '80%', //change the innerRadius here.
          dataPoints: [
            { y: 20 }, //EASY
            { y: 55 }, //MEDIUM
            { y: 50 }, //HARD
          ],
        },
      ],
    });

    chart.render();
  }

  copyClipboard() {
    navigator.clipboard.writeText(this.schoolPath);
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 1500);
  }
}
