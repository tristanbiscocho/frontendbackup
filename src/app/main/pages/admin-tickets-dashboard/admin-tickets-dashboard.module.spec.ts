import { AdminTicketsDashboardModule } from './admin-tickets-dashboard.module';

describe('AdminTicketsDashboardModule', () => {
  let adminTicketsDashboardModule: AdminTicketsDashboardModule;

  beforeEach(() => {
    adminTicketsDashboardModule = new AdminTicketsDashboardModule();
  });

  it('should create an instance', () => {
    expect(adminTicketsDashboardModule).toBeTruthy();
  });
});
