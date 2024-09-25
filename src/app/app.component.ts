import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { PokeApiService } from './services/poke-api.service';
import { Pokemon } from './models/pokemon';
import { NgClass, NgForOf } from '@angular/common';
import { converterParaTitleCase } from './util/converter-para-title-case';
import { TipoPokemon } from './models/tipo-pokemon';
import { ListagemComponent } from "./components/listagem/listagem.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, NgForOf, NgClass, ListagemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
