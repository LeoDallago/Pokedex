import { Injectable } from "@angular/core";
import { Pokemon } from "../models/pokemon";

@Injectable({providedIn: 'root'})
export class LocalStorageService {
  private readonly chave = 'academia:pokedex';

  public salvarFavoritos (pokemonsFavoritos: Pokemon[]): void {

    localStorage.setItem(this.chave, JSON.stringify(pokemonsFavoritos));
  }

  public obterFavoritos (): Pokemon[] {
    const jsonString =  localStorage.getItem(this.chave);

    if(!jsonString) return [];

    const favoritos =  JSON.parse(jsonString) as Pokemon[];

    return favoritos;
  }
}
