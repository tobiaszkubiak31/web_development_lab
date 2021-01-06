import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { AddCardDto } from './cards.dto';
import { Card } from './cards.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  async create(addCardDto: AddCardDto): Promise<Card> {
    return await this.cardRepository.save({
      name: addCardDto.card_name,
      list_id: addCardDto.list_id,
    });
  }

  async getCards(list_id: number) {
    return await getRepository(Card)
      .createQueryBuilder('card')
      .where('card.list_id = :list_id', { list_id: list_id })
      .select(['card.id', 'card.name', 'card.time_limit'])
      .getMany();
  }

  async updateName(card_id: number, card_new_name: string): Promise<boolean> {
    const updated = await this.cardRepository.update(card_id, {
      name: card_new_name,
    });
    return updated.affected === 1;
  }

  async updateTimeLimit(card_id: number, time_limit: string): Promise<boolean> {
    const updated = await this.cardRepository.update(card_id, {
      time_limit: time_limit,
    });
    return updated.affected === 1;
  }

  async changeLabelsState(card_id: number, label_ids: number[]): Promise<boolean> {
    const card = await this.cardRepository.findOne(card_id);
    if (card) {
      const labels = card.label_ids.split(' ').map(item => parseInt(item));
      label_ids.forEach(label_id => {
        if (labels.find(label => label == label_id)) {
          const index = labels.indexOf(label_id);
          if (index > -1) {
            labels.splice(index, 1);
          }
        } else {
          labels.push(label_id);
        }
      });

      const new_label_ids = labels.join(' ');
      const updated = await this.cardRepository.update(card_id, {
        label_ids: new_label_ids,
      });
      return updated.affected === 1;
    }
  }
  
  async findOne(id: number): Promise<Card> {
    return await this.cardRepository.findOne(id);
  }
}
