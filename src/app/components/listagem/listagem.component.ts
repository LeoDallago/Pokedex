import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from "../../models/pokemon";
import { NgClass, NgForOf } from "@angular/common";
import { PokeApiService } from "../../services/poke-api.service";
import { converterParaTitleCase } from "../../util/converter-para-title-case";
import { TipoPokemon } from "../../models/tipo-pokemon";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    RouterLink
  ],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss'
})
export class ListagemComponent implements OnInit{

  public pokemons: Pokemon[];

  constructor(private pokeApiService: PokeApiService) {
    this.pokemons = [];
  }

  public coresBackgroundTipo: any = {
    Normal: 'fundo-tipo-normal',
    Fire: 'fundo-tipo-fogo',
    Water: 'fundo-tipo-agua',
    Electric: 'fundo-tipo-eletrico',
    Ice: 'fundo-tipo-gelo',
    Grass: 'fundo-tipo-grama',
    Bug: 'fundo-tipo-inseto',
    Poison: 'fundo-tipo-veneno',
    Flying: 'fundo-tipo-voador',
    Ground: 'fundo-tipo-terra',
    Rock: 'fundo-tipo-pedra',
    Fighting: 'fundo-tipo-lutador',
    Psychic: 'fundo-tipo-psiquico',
    Ghost: 'fundo-tipo-fantasma',
    Dark: 'fundo-tipo-sombrio',
    Fairy: 'fundo-tipo-fada',
    Steel: 'fundo-tipo-aco',
  };

  ngOnInit(): void {
    this.pokeApiService.selecionarTodos().subscribe((res) => {
      const arrayDeResultados = res.results as any[];

      for (let resultado of arrayDeResultados) {
        this.pokeApiService
          .selecionarDetalhesPorUrl(resultado.url)
          .subscribe((resDetalhes: any) => {
            const pokemon = this.mapearPokemon(resDetalhes)

            this.pokemons.push(pokemon)
          });
      }

      this.pokemons = arrayDeResultados.map(this.mapearPokemon);
    });
  }

  private mapearPokemon(obj: any): Pokemon {
    return {
      nome: converterParaTitleCase(obj.name),
      urlSprite: obj.sprites.other.dream_world.front_default,
      tipos: obj.types.map(this.mapearTipoPokemon),
    };
  }

  private mapearTipoPokemon(obj: any): TipoPokemon {
    return { nome: converterParaTitleCase(obj.type.name) }
  }
}
