import { DataRecord, EmailCase } from '../types';

export const getEmailRule = (record: DataRecord): EmailCase => {
  if (
    record.email.split('@')[0] ===
    record.fullName.toLowerCase().replace(/\s/g, '')
  )
    return EmailCase.firstLast;
  else return EmailCase.firstInitLast;
};

export const getEmail = (
  fullName: string,
  domain: string,
  rule: EmailCase,
): string => {
  switch (rule) {
    case EmailCase.firstLast:
      return `${fullName.toLowerCase().replace(/\s/g, '')}@${domain}`;
    case EmailCase.firstInitLast:
      return `${fullName.toLowerCase().split(' ')[0][0]}${
        fullName.toLowerCase().split(' ')[1] ?? ''
      }@${domain}`;
  }
};
