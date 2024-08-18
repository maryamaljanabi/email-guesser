import { Injectable } from '@nestjs/common';
import { sampleDataset } from '../data/sampleDataset';
import { DataRecord } from '../types';

@Injectable()
export class EmailDatasetRepository {
  private dataset: Record<string, string> = sampleDataset;

  getAll(): Record<string, string> {
    return this.dataset;
  }

  getByDomain(domain: string): DataRecord[] {
    return Object.entries(this.dataset).reduce((acc, [name, email]) => {
      if (email.split('@')[1].toLowerCase() === domain) {
        acc.push({ fullName: name, email: email });
      }
      return acc;
    }, []);
  }
}
