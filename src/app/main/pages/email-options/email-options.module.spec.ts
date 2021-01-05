import { EmailOptionsModule } from './email-options.module';

describe('EmailOptionsModule', () => {
  let emailOptionsModule: EmailOptionsModule;

  beforeEach(() => {
    emailOptionsModule = new EmailOptionsModule();
  });

  it('should create an instance', () => {
    expect(emailOptionsModule).toBeTruthy();
  });
});
