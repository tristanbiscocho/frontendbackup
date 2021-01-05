import { KnowledgeBaseDashboardModule } from './knowledge-base-dashboard.module';

describe('KnowledgeBaseDashboardModule', () => {
  let knowledgeBaseDashboardModule: KnowledgeBaseDashboardModule;

  beforeEach(() => {
    knowledgeBaseDashboardModule = new KnowledgeBaseDashboardModule();
  });

  it('should create an instance', () => {
    expect(knowledgeBaseDashboardModule).toBeTruthy();
  });
});
