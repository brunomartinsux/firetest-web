import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-display',
  templateUrl: './test-display.component.html',
  styleUrls: ['./test-display.component.css'],
})
export class TestDisplayComponent implements OnInit {
  report: boolean = false;
  feedbackUp: boolean = false;
  tentou: boolean = false;

  tests = [
    {
      subject: 'Fisica/Princípios da Física',
      img: '/assets/test-img.svg',
      body: [
        'Uma pesquisa de mercado sobre produtos de higiene e limpeza apresentou o comparativo entre duas marcas, A e B.',
        'Esses produtos são concentrados e, para sua utilização, é necessária sua diluição em água.',
        'Uma pesquisa de mercado sobre produtos de higiene e limpeza apresentou o comparativo entre duas marcas, A e B. limpeza apresentou o comparativo entre duas marcas, A e B.',
        'Nessas condições, as marcas dos quatro produtos adquiridos pelo consumidor, na ordem apresentada na tabela, são:',
      ],
      answers: [
        { option: 'A', body: 'A, A, A, B', isCorrect: true },
        { option: 'B', body: 'A, B, A, A', isCorrect: false },
        { option: 'C', body: 'A, B, C, B', isCorrect: false },
        { option: 'D', body: 'A, A, A, A', isCorrect: false },
        { option: 'E', body: 'A, B, B, B', isCorrect: false },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  handleAnswer(isCorrect: boolean, target: any) {
    const element = target as Element;
    const incorrects = document.getElementsByClassName('option-btn');

    if (isCorrect) {
      element.setAttribute('correct', 'true');
      element.className += ' correct';
      for (let i = 0; i < 5; i++) {
        if (!incorrects[i].hasAttribute('correct')) {
          incorrects[i].className += ' disabled';
        }
      }
    } else {
      for (let i = 0; i < 5; i++) {
        var id = incorrects[i].id;
        if ((id != 'correct')) {
          incorrects[i].className += ' incorrect';
        } else {
          incorrects[i].className += ' correct'
        }
      }
    }
  }
}
