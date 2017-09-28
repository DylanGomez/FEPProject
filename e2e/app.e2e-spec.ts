import { HardwareAppPage } from './app.po';

describe('hardware-app App', function() {
  let page: HardwareAppPage;

  beforeEach(() => {
    page = new HardwareAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
