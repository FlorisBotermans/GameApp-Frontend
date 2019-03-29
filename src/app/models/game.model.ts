import { Character } from './character.model';
import { Developer } from './developer.model';

export interface Game {
    id: string,
    name: string,
    description: string,
    platform: string,
    category: string,
    developer: Developer,
    characters: Character[]
}