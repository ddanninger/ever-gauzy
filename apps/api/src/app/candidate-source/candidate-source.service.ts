import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../core/crud/crud.service';
import { CandidateSource } from './candidate-source.entity';

@Injectable()
export class CandidateSourceService extends CrudService<CandidateSource> {
	constructor(
		@InjectRepository(CandidateSource)
		private readonly candidateSourceRepository: Repository<CandidateSource>
	) {
		super(candidateSourceRepository);
	}
	createSource(createInput: any) {
		//TO DO
		return this.candidateSourceRepository.create(createInput);
	}
}
