import { LanguageChangeModule } from './language-change.module';

describe('LanguageChangeModule', () => {
  let languageChangeModule: LanguageChangeModule;

  beforeEach(() => {
    languageChangeModule = new LanguageChangeModule();
  });

  it('should create an instance', () => {
    expect(languageChangeModule).toBeTruthy();
  });
});
