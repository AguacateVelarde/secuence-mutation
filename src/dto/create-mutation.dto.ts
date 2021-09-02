import {
  IsArray,
  IsNotEmpty,  
} from 'class-validator';


export class CreateMutationDTO {
  @IsArray()  
  @IsNotEmpty() 
  dna: string[];
}