import { SystemUserModule } from "./system-user.module";


describe('AgentModule', () => {
  let agentModule: SystemUserModule;

  beforeEach(() => {
    agentModule = new SystemUserModule();
  });

  it('should create an instance', () => {
    expect(agentModule).toBeTruthy();
  });
});
