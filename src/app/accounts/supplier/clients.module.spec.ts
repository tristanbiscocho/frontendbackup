import { ClientstModule } from './clients.module';

describe('AgentModule', () => {
  let agentModule: ClientstModule;

  beforeEach(() => {
    agentModule = new ClientstModule();
  });

  it('should create an instance', () => {
    expect(agentModule).toBeTruthy();
  });
});
