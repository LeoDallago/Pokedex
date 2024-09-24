import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { PokeApiService } from './services/poke-api.service';
import { Pokemon } from './models/pokemon';
import { NgForOf } from '@angular/common';
import { converterParaTitleCase } from './util/converter-para-title-case';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public pokemons: Pokemon[];

  constructor(private pokeApiService: PokeApiService) {
    this.pokemons = [];
  }

  ngOnInit(): void {
    this.pokeApiService.selecionarTodos().subscribe((res) => {
      const arrayDeResultados = res.results as any[];

      console.log(arrayDeResultados);

      this.pokemons = arrayDeResultados.map(obj => {
        return {
          nome: converterParaTitleCase(obj.name),
        }
      });
    });
  }
}
