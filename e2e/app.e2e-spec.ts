import { IASNEW2Page } from './app.po';

describe('iasnew2 App', function() {
  let page: IASNEW2Page;

  beforeEach(() => {
    page = new IASNEW2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
