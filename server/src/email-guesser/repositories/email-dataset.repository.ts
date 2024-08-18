import { Injectable } from '@nestjs/common';
import { sampleDataset } from '../data/sampleDataset';

@Injectable()
export class EmailDatasetRepository {
  private dataset: Record<string, string> = sampleDataset;

  getAll(): Record<string, string> {
    return this.dataset;
  }
}
