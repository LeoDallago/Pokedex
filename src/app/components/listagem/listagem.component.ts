import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from "../../models/pokemon";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { PokeApiService } from "../../services/poke-api.service";
import { converterParaTitleCase } from "../../util/converter-para-title-case";
import { TipoPokemon } from "../../models/tipo-pokemon";
import { RouterLink } from "@angular/router";
import { CardPokemonComponent } from "./card-pokemon/card-pokemon.component";
import { BuscaComponent } from "../busca/busca.component";
import { StatusFavoritoPokemon } from "../../models/status-favorito.pokemon";
import { PokemonsFavoritosComponent } from "./pokemons-favoritos/pokemons-favoritos.component";
import { LocalStorageService } from "../../services/local-storage-service";

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgIf,
    RouterLink,
    CardPokemonComponent,
    BuscaComponent,
    PokemonsFavoritosComponent
  ],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss'
})
export class ListagemComponent implements OnInit{
  public pokemons: Pokemon[];

  public pokemonsFavoritos: Pokemon[];

  public buscaRealizada: boolean = false;

  constructor(
    private pokeApiService: PokeApiService,
    private localStorageService: LocalStorageService
  )
  {
    this.pokemons = [];
    this.pokemonsFavoritos = [];
    this.offsetPaginacao = 0;
  }

 public ngOnInit(): void {
    this.obterPokemons()

   this.pokemonsFavoritos = this.localStorageService.obterFavoritos()
  }

 public buscarMairResultados(): void {
    this.offsetPaginacao += 20;

    this.obterPokemons()
  }

  public filtrarPokemons(textoFiltro: string): void{
    this.buscaRealizada = true;
   this.pokemons = this.pokemons.filter(p => {
      return p.nome.toLowerCase().includes(textoFiltro)
    })
  }

  public limparFiltro(){
    this.buscaRealizada = false;

    this.pokemons = [];
    this.obterPokemons()
  }

  public alternarStatusFavorito(status: StatusFavoritoPokemon){
   if(status.statusFavorito == true){
     this.pokemonsFavoritos.push(status.pokemon);
   }
   else{
    this.pokemonsFavoritos = this.pokemonsFavoritos.filter(
      p => p.id != status.pokemon.id
    );
   }

   status.pokemon.favorito = !status.pokemon.favorito;

   this.localStorageService.salvarFavoritos(this.pokemonsFavoritos);
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
      favorito: this.pokemonsFavoritos.some(p => p.id == obj.id)
    };
  }

  private mapearTipoPokemon(obj: any): TipoPokemon {
    return { nome: converterParaTitleCase(obj.type.name) }
  }
}
