import { Rule } from '@prisma/client';

interface RuleOmit extends Omit<Rule, 'userId'> {}

export type RuleRO = {
  data: RuleOmit;
};

export type RulesRO = {
  data: RuleOmit[];
};
