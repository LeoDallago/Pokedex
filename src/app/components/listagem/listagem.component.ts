import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from "../../models/pokemon";
import { NgClass, NgForOf } from "@angular/common";
import { PokeApiService } from "../../services/poke-api.service";
import { converterParaTitleCase } from "../../util/converter-para-title-case";
import { TipoPokemon } from "../../models/tipo-pokemon";
import { RouterLink } from "@angular/router";
import { CardPokemonComponent } from "./card-pokemon/card-pokemon.component";

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    RouterLink,
    CardPokemonComponent
  ],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss'
})
export class ListagemComponent implements OnInit{
  public pokemons: Pokemon[];

  constructor(private pokeApiService: PokeApiService) {
    this.pokemons = [];
    this.offsetPaginacao = 0;
  }

 public ngOnInit(): void {
    this.obterPokemons()
  }

 public buscarMairResultados(): void {
    this.offsetPaginacao += 20;

    this.obterPokemons()
  }

  private obterPokemons(){
    this.pokeApiService.selecionarTodos(this.offsetPaginacao).subscribe((res) => {
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

  private offsetPaginacao: number;


  private mapearPokemon(obj: any): Pokemon {
    return {
      id: obj.id,
      nome: converterParaTitleCase(obj.name),
      urlSprite: obj.sprites.other.dream_world.front_default,
      tipos: obj.types.map(this.mapearTipoPokemon),
    };
  }

  private mapearTipoPokemon(obj: any): TipoPokemon {
    return { nome: converterParaTitleCase(obj.type.name) }
  }
}
