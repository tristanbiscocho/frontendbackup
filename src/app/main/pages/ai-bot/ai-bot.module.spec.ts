import { AiBotModule } from './ai-bot.module';

describe('AiBotModule', () => {
  let aiBotModule: AiBotModule;

  beforeEach(() => {
    aiBotModule = new AiBotModule();
  });

  it('should create an instance', () => {
    expect(aiBotModule).toBeTruthy();
  });
});
