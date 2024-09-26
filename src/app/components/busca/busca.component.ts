import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss'
})
export class BuscaComponent {

  @Output() pesquisaFeita: EventEmitter<string>;

  constructor() {
    this.pesquisaFeita = new EventEmitter();
  }

 public onCLick(texto: string):void{
   this.pesquisaFeita.emit(texto)
 }

}
