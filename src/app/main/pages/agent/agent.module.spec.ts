import { AgentModule } from './agent.module';

describe('AgentModule', () => {
  let agentModule: AgentModule;

  beforeEach(() => {
    agentModule = new AgentModule();
  });

  it('should create an instance', () => {
    expect(agentModule).toBeTruthy();
  });
});
