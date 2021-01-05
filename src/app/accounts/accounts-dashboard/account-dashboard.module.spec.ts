import { AccountsDashboardModule } from "./accounts-dashboard.module";



describe('CrmDashboardModule', () => {
  let crmDashboardModule: AccountsDashboardModule;

  beforeEach(() => {
    crmDashboardModule = new AccountsDashboardModule();
  });

  it('should create an instance', () => {
    expect(crmDashboardModule).toBeTruthy();
  });
});
